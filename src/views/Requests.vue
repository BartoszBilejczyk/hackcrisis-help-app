<template>
  <div class="requests">
    <div class="requests__type">
      <div class="requests__button-wrapper">
        <AntButton
          :type="requestStatusActive === 'active' ? 'primary' : 'default'"
          @click="requestStatusActive = 'active'"
        >
          Active
        </AntButton>
        <AntTag v-if="unseen.length">{{ unseen.length }}</AntTag>
      </div>
      <AntButton
        :type="requestStatusActive === 'finished' ? 'primary' : 'default'"
        @click="requestStatusActive = 'finished'"
      >
        Finished
      </AntButton>
    </div>
    <div class="requests__subtype">
      <AntButton
        :type="requestModeActive === 'give' ? 'primary' : 'default'"
        @click="requestModeActive = 'give'"
      >
        Who I help
      </AntButton>
      <AntButton
        :type="requestModeActive === 'get' ? 'primary' : 'default'"
        @click="requestModeActive = 'get'"
      >
        Who helps me
      </AntButton>
    </div>
    <template v-if="!loading">
      <div class="requests__list" v-if="requests.length">
        <div
          class="requests__list-item"
          v-for="request in requests"
          :key="request.id"
        >
          <div class="request__list-item-info">
            <h4 class="heading heading--secondary">Info</h4>
            <div class="flex justify-space-between align-center">
              <p class="copy">Date of request:</p>
              <p class="copy">{{ request.dateStarted }}</p>
            </div>
            <div class="flex justify-space-between align-center">
              <p class="copy">Category</p>
              <AntTag>
                {{ request.task.category }}
              </AntTag>
            </div>
            <div class="flex justify-space-between align-center">
              <p class="copy">Status:</p>
              <div class="copy flex align-center">
                {{ statusText(request.status) }}
                <AntIcon :type="statusIcon(request.status)"></AntIcon>
              </div>
            </div>
          </div>

          <div class="requests__list-item-info">
            <h4 class="heading heading--secondary">{{ request.mode === 'get' ? 'Who is helping you' : 'Who you are helping' }}</h4>
            <div class="flex justify-space-between align-center">
              <p class="copy">Name:</p>
              <p class="copy">{{ request.user.name }}</p>
            </div>
            <div class="flex justify-space-between align-center">
              <p class="copy">Phone:</p>
              <p class="copy">{{ request.user.phone }}</p>
            </div>
            <div class="flex justify-space-between align-center">
              <p class="copy">ThankYou Coins:</p>
              <p class="copy">{{ request.user.thanks }}</p>
            </div>
          </div>

          <div class="requests__confirm" v-if="request.status !== 'finished'">
            <AntButton type="primary" @click="confirmFinish(request)" :loading="buttonLoading === request.id">
              {{ getConfirmButtonText(request) }}
            </AntButton>
          </div>

          <div class="review" v-if="request.review === 'pending'">
            <h2 class="heading heading--secondary">
              Leave a review
            </h2>
            <div class="review-thanks">
              <span
                v-for="i in 3" :key="i" :class="{ 'active': i === reviewThanksActive }"
                @click="reviewThanksActive = i"
              >
                {{ i }} 🙏
              </span>
            </div>
            Note
            <AntTextarea v-model="reviewNote"></AntTextarea>
            <AntButton type="primary" @click="leaveReview(request)">
              Finish Review
            </AntButton>
          </div>
          <div class="review-done" v-else-if="request.review && request.review.thanks">
            <p class="copy">You got {{ request.review.thanks }} &#x1F64F; for helping. Here is additional note from {{ request.user.name }}</p>
            <p class="copy">
              "{{ request.review.note }}"
            </p>
          </div>
          <div class="review-done" v-else-if="request.review === 'finished'">
            <p class="copy">You reviewed {{ request.user.name }}. You will get &#x1F64F; after {{ request.user.name }} confirms.</p>
          </div>
        </div>
      </div>
      <h2 v-else class="heading heading--secondary requests__empty">No requests within this status.</h2>
    </template>
    <div v-else class="requests__loading">
      <AntSpin>
        <AntIcon slot="indicator" type="loading" spin />
      </AntSpin>
    </div>
  </div>
</template>

<script>
  import { interpret } from 'xstate';
  import { requestsMachine } from '../machines/requests';

  import { mapState, mapActions, mapMutations } from 'easy-vuex-modules';
  import { requests } from '@/store';

  import {
    Button as AntButton,
    Input as AntInput,
    Tag as AntTag,
    Spin as AntSpin,
    Icon as AntIcon,
  } from 'ant-design-vue';

  export default {
    name: 'Requests',
    components: {
      AntButton,
      AntTag,
      AntIcon,
      AntSpin,
      AntTextarea: AntInput.TextArea,
    },
    created() {
      this.requestsService
        .onTransition(state => {
          this.current = state;
          this.context = state.context;
        })
        .start();
    },
    data() {
      return {
        requestsService: interpret(requestsMachine),
        current: requestsMachine.initialState,
        context: requestsMachine.context,
        requestStatusActive: 'active',
        requestModeActive: 'give',
        loading: false,
        buttonLoading: null,
        reviewNote: '',
        reviewThanksActive: 3
      };
    },
    computed: {
      ...mapState(['requests.list', 'requests.added', 'requests.unseen']),

      all() {
        return this.list.concat(this.added);
      },

      activeGiveRequests() {
        return this.all.filter(r => r.mode === 'give' && r.status === 'active');
      },
      finishedGiveRequests() {
        return this.all.filter(r => r.mode === 'give' && r.status === 'finished');
      },
      activeGetRequests() {
        return this.all.filter(r => r.mode === 'get' && r.status === 'active');
      },
      finishedGetRequests() {
        return this.all.filter(r => r.mode === 'get' && r.status === 'finished');
      },
      requests() {
        switch (this.requestStatusActive) {
          case 'active':
            return this.requestModeActive === 'get' ? this.activeGetRequests : this.activeGiveRequests;
          case 'finished':
            return this.requestModeActive === 'get' ? this.finishedGetRequests : this.finishedGiveRequests;
          default:
            return this.activeGiveRequests;
        }
      }
    },
    async mounted() {
      if (this.$route.query.status) {
        this.requestStatusActive = this.$route.query.status
      }

      if (this.$route.query.mode) {
        this.requestModeActive = this.$route.query.mode
      }

      if (!this.list.length) {
        this.loading = true;
        await this.hydrateRequests();
        this.loading = false;
      }

      this.cleanUnseenMutation();
    },
    methods: {
      ...mapActions([
        requests.actions.hydrateRequests
      ]),
      ...mapMutations([
        requests.mutations.cleanUnseenMutation,
        requests.mutations.updateRequestMutation
      ]),

      statusText(status) {
        switch (status) {
          case 'active':
            return 'Active';
          case 'finished':
            return 'Finished';
          default:
            return 'Active'
        }
      },
      statusIcon(status) {
        switch (status) {
          case 'active':
            return 'loading-3-quarters';
          case 'finished':
            return 'check-circle';
          default:
            return 'loading-3-quarters'
        }
      },
      getConfirmButtonText(request) {
        if (request.mode === 'get' && request.status === 'active') {
          return 'I confirm that I received help';
        } else if (request.mode === 'give' && request.status === 'active') {
          return 'I confirm that I helped';
        }
      },
      confirmFinish(request) {
        this.buttonLoading = request.id;

        new Promise(resolve => setTimeout(() => {
          this.buttonLoading = null;

          const message = request.mode === 'give'
            ? `Thanks for your service ❤️! When the other person confirms, you will get 🙏 ThankYou Coins`
            : 'We are happy to see that you received help. We wish you all the best for this difficult time ❤️';

          this.updateRequestMutation({
            status: 'finished',
            id: request.id,
            review: 'pending'
          });

          this.requestStatusActive = 'finished';

          this.$message.success(message, 4);
          resolve();
        }, 1500));
      },
      leaveReview(request) {
        this.updateRequestMutation({
          status: 'finished',
          id: request.id,
          review: 'finished'
        });

        this.reviewNote = ''
      }
    }
  };
</script>

<style lang="scss">
  .requests {
    height: 100%;
    position: relative;

    &__button-wrapper {
      position: relative;

      .ant-tag {
        position: absolute;
        top: -16px;
        right: -4px;
        background: color(accent);
      }
    }

    &__loading {
      display: flex;
      height: 100%;
      position: relative;

      .ant-spin {
        @include center();
        left: 175px;
        top: 175px;
      }
    }

    &__type,
    &__subtype {
      display: flex;
      margin-top: globalVars(ui-default-measure);
    }

    &__list {
      margin-top: 50px;
      display: flex;
      flex-wrap: wrap;

      &-item {
        margin: 10px 10px 10px 0;
        padding: globalVars(ui-default-measure3x);
        box-shadow: globalVars(ui-default-box-shadow--light);
        background: white;
        width: 350px;
        border-radius: globalVars(ui-default-measure);

        &-info {
          margin-top: globalVars(ui-default-measure3x);

          h4 {
            margin: 4px 0;
          }
        }
      }

      .ant-tag {
        background: color(accent);
        margin: 0;
      }

      .anticon {
        margin-left: 4px;

        svg {
          height: 20px;
          width: 20px;
        }
      }

      .anticon-loading-3-quarters {
        animation: loading 1.2s linear infinite;
        animation-duration: 3s;

        svg {
          fill: color(primary);
        }
      }

      .anticon-clock-circle svg {
        fill: color(accent)
      }

      .anticon-check-circle svg {
        fill: green;
      }

      @keyframes loading {
        0% {
          transform: rotate(0deg);
        }
        20% {
          transform: rotate(360deg);
        }
        40% {
          transform: rotate(720deg);
        }
        100% {
          transform: rotate(720deg);
        }
      }
    }

    &__confirm {
      margin: globalVars(ui-default-measure2x) auto 0;
      display: flex;
      justify-content: center;
    }

    &__empty {
      @include center();
    }
  }

  .review {
    &-done {
      padding: 8px 16px;
      background: lighten(#6044E0, 38%);
      border-radius: 8px;
    }

    &-thanks {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;

      span {
        display: block;
        padding: 4px 10px;
        background: lighten(#6044E0, 38%);
        width: 33%;
        border-radius: 8px;
        text-align: center;
        font-size: 20px;
        cursor: pointer;

        &:nth-of-type(2) {
          margin: 0 8px;
        }

        &.active {
          background: color(primary);
          color: white;
        }
      }
    }


    .ant-btn {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
