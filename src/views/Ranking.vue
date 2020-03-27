<template>
  <div class="ranking" v-if="list.length">
    <div class="ranking__list-wrapper">
      <h1 class="heading heading--primary">Best Helpers Leaderboard</h1>
      <p class="copy">Week 23.03-29.03</p>
      <table class="ranking__list" v-if="list">
        <thead>
          <tr>
            <th>Place</th>
            <th>Avatar</th>
            <th>Name</th>
            <th>ThankYou Coins</th>
            <th>Best Category</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="ranking__list-item"
            v-for="(item, index) in list"
            :key="item.id"
            :class="{ 'ranking__list-item-me': index === 8}"
          >
            <td class="ranking__list-item-place" :class="{'ranking__list-item-place--top': item.place < 4}">{{ item.place }}.</td>
            <td>
              <img
                class="ranking__list-item-avatar--empty"
                v-if="item.avatar"
                :src="item.avatar"
                alt=""
              >
              <div v-else class="ranking__list-item-avatar--empty"></div>
            </td>
            <td>{{ item.name }}</td>
            <td>
              <div class="ranking__list-item-thanks">
                &#x1F64F;
                <span>{{ item.thanks }}</span>
              </div>
            </td>
            <td>
              <AntTag
                v-for="tag in item.bestCategories"
                :key="tag"
              >
                {{ tag.toUpperCase() }}
              </AntTag>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="ranking__prize">
      <h1 class="heading heading--primary">Prizes</h1>
      <img src="../assets/karta_empik.png" alt="Karta Empik">
      <p class="copy">
        Every week, most helpful 10 people get:
      </p>
      <h3 class="heading heading--secondary">
        Empik 100 PLN gift cards
      </h3>

      <div class="ranking__prize-terms">
        More details in <a href="">Terms and Conditions</a>(inactive for demo)
      </div>
    </div>
  </div>
  <div v-else class="ranking__empty">
    <AntSpin>
      <AntIcon slot="indicator" type="loading" spin />
    </AntSpin>
  </div>
</template>

<script>
  import {
    Tag as AntTag,
    Spin as AntSpin,
    Icon as AntIcon,
  } from 'ant-design-vue';

  import { mapState, mapActions } from 'easy-vuex-modules';
  import { ranking } from '@/store';

  export default {
    name: 'Ranking',
    components: {
      AntTag,
      AntSpin,
      AntIcon
    },
    async mounted() {
      if (!this.list.length) {
        await this.hydrateRanking();
      }
    },
    computed: {
      ...mapState(['ranking.list'])
    },
    methods: {
      ...mapActions([ranking.actions.hydrateRanking])
    }
  };
</script>

<style lang="scss">
  .ranking {
    display: flex;
    flex-direction: column;

    .heading {
      text-align: center;
    }

    @include md-up {
      flex-direction: row;
    }

    &__empty {
      display: flex;
      height: 100%;
      position: relative;

      .ant-spin {
        @include center();
      }
    }

    &__list {
      border-collapse: collapse;
      margin-top: globalVars(ui-default-measure2x);

      th {
        text-align: center;
        padding: 4px 12px;

      }

      th:nth-of-type(1),
      td:nth-of-type(1),
      th:nth-of-type(2),
      td:nth-of-type(2) {
        display: none;

        @include sm-up {
          display: table-cell;
        }
      }

      &-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      &-item {
        border-bottom: 1px solid color(gray-background-dark);

        td {
          vertical-align: middle;
          padding: 12px;
          text-align: center;
        }

        .ant-tag {
          background: color(primary);
        }

        &-place {
          @include font(18, 600);

          &--top {
            color: color(accent);
          }
        }

        &-avatar {
          &--empty {
            width: 40px;
            height: 40px;
            background: color(gray-background-dark);
            border-radius: 50%;
          }
        }

        &-thanks {
          color: color(primary);
          display: flex;
          align-items: center;
          justify-content: center;

          .anticon svg {
            height: 20px;
            width: 20px;
            color: color(accent);
            margin-right: 4px;
          }

          span {
            @include font(14, 600);
          }
        }

        &-me {
          background: color(primary);
          padding: 20px;
          border-radius: 50px;

          * {
            color: white;
          }

          .ant-tag {
            background: color(accent);
          }
        }
      }
    }

    &__prize {
      margin-top: 50px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 16px;

      @include md-up {
        margin-top: 0;
      }

      &-terms {
        margin-top: 50px;

        a {
          color: color(accent);
        }
      }
    }
  }
</style>
