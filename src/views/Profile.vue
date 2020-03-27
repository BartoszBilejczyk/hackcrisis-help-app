<template>
  <div class="profile" v-if="details.id">
    <div class="profile__main">
      <div class="profile__image">
        <div class="profile__image-content">
          <img src="../assets/gialdo.png" alt="">
        </div>
      </div>
      <h1 class="heading heading--primary">
        {{ details.name }}
      </h1>
      <p>{{ details.level }}</p>
      <div class="profile__coins">
        <div class="profile__coins-value">
          &#x1F64F;
          <span>{{ details.thanks }}</span>
        </div>
        <p>ThankYou Coins</p>
      </div>

      <div class="profile__data">
        <p><span class="label">Email: </span>{{ details.email }}</p>
        <p><span class="label">Phone: </span>{{ details.phone }}</p>
      </div>
    </div>
    <div class="profile__additional">
      <h2 class="heading heading--primary">Your badges</h2>
      <div class="profile__additional-badges">
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item">
            <div class="profile__additional-badges-item-progress"></div>
            <div class="profile__additional-badges-item-progress-divider"></div>
            <div class="pie pie1"></div>
            <div class="profile__additional-badges-item-background">
              <img src="../assets/1.png" alt="">
            </div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x1
            </div>
          </div>
        </div>
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item">
            <div class="profile__additional-badges-item-progress"></div>
            <div class="profile__additional-badges-item-progress-divider"></div>
            <div class="pie pie2"></div>
            <div class="profile__additional-badges-item-background">
              <img src="../assets/3.png" alt="">
            </div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x3
            </div>
          </div>
        </div>
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item">
            <div class="profile__additional-badges-item-progress"></div>
            <div class="profile__additional-badges-item-progress-divider"></div>
            <div class="pie pie3"></div>
            <div class="profile__additional-badges-item-background">
              <img src="../assets/5.png" alt="">
            </div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x5
            </div>
          </div>
        </div>
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item profile__additional-badges-item--empty">
            <div class="profile__additional-badges-item-progress"></div>
            <div class="profile__additional-badges-item-progress-divider"></div>
            <div class="pie pie4"></div>
            <div class="profile__additional-badges-item-background">
              <img src="../assets/10.png" alt="">
            </div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x10
            </div>
          </div>
        </div>
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item profile__additional-badges-item--empty">
            <div class="profile__additional-badges-item-progress"></div>
            <div class="profile__additional-badges-item-progress-divider"></div>
            <div class="pie pie5"></div>
            <div class="profile__additional-badges-item-background">
              <img src="../assets/20.png" alt="">
            </div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x20
            </div>
          </div>
        </div>
        <div class="profile__additional-badges-wrapper">
          <div class="profile__additional-badges-item profile__additional-badges-item--empty">
<!--            <div class="profile__additional-badges-item-progress"></div>-->
<!--            <div class="profile__additional-badges-item-progress-divider"></div>-->
<!--            <div class="pie pie6"></div>-->
            <div class="profile__additional-badges-item-background"></div>
            <div class="profile__additional-badges-item-illustration"></div>
            <div class="profile__additional-badges-item-task">
              x50
            </div>
          </div>
        </div>
      </div>
      <div class="profile__additional-reviews">
        <h2 class="heading heading--primary">Reviews about You</h2>

        <div class="profile__additional-reviews-totals">
          <span class="heading">{{ details.reviews && details.reviews.length }} reviews</span>
        </div>
        <div class="profile__additional-reviews-item">
          <AntComment
            v-for="review in details.reviews"
            :key="review.id"
            :author="review.author"
            :content="review.content"
            :datetime="review.datetime"
          ></AntComment>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="profile__empty">
    <AntSpin>
      <AntIcon slot="indicator" type="loading" spin />
    </AntSpin>
  </div>
</template>

<script>
  import {
    Comment as AntComment,
    Spin as AntSpin,
    Icon as AntIcon,
  } from 'ant-design-vue';

  import { mapState } from 'easy-vuex-modules';

  export default {
    name: 'Profile',
    components: {
      AntComment,
      AntSpin,
      AntIcon
    },
    computed: {
      ...mapState(['user.details'])
    }
};
</script>

<style lang="scss">
  .profile {
    display: flex;
    flex-wrap: wrap;

    &__empty {
      display: flex;
      height: 100%;
      position: relative;

      .ant-spin {
        @include center();
      }
    }

    &__main {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
    }

    &__image {
      background: color(gray-background);
      width: 250px;
      height: 250px;
      position: relative;
      border-radius: 50%;

      img {
        width: inherit;
        height: inherit;
        border-radius: 50%;
      }

      &-content {
        background: color(primary);
        width: 200px;
        height: 200px;
        position: absolute;
        top: 25px;
        left: 25px;
        border-radius: 50%;
      }
    }

    &__coins {
      .anticon svg {
        height: globalVars(ui-default-measure3x);
        width: globalVars(ui-default-measure3x);
        margin-right: 4px;
        color: color(accent);
      }

      &-value {
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          @include font(20, 600);
          position: relative;
          color: color(accent);
          margin: 8px 0;
        }
      }
    }

    &__additional {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;

      > * {
        max-width: 600px;
      }

      h2 {
        text-align: center;
      }

      &-badges {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;

        &-wrapper {
          width: 50%;
          display: flex;
          justify-content: center;

          @include md-up {
            width: 33%;
          }
        }

        &-item {
          width: 130px;
          height: 130px;
          position: relative;
          border-radius: 50%;
          margin-top: globalVars(ui-default-measure2x);
          margin-bottom: globalVars(ui-default-measure4x);

          &--empty {
            .profile__additional-badges-item-illustration {
              display: none;
            }
          }

          &-illustration {

          }
          img {
            height: inherit;
            width: inherit;
            border-radius: 50%;
          }

          &-task {
            position: absolute;
            bottom: -8px;
            right: -24px;
            box-shadow: globalVars(ui-default-box-shadow);
            background: white;
            padding: globalVars(ui-default-measure) globalVars(ui-default-measure3x);
            border-radius: globalVars(ui-default-measure3x);
          }

          &-progress {
            position: absolute;
            top: -10px;
            left: -10px;
            width: 160px;
            height: 160px;
            border-radius: 50%;
            background: linear-gradient(90deg, rgba(189,177,242,1) 0%, rgba(96,68,224,1) 100%);

            &-divider {
              position: absolute;
              width: 140px;
              height: 140px;
              border-radius: 50%;
              background: lighten(#F1F3F8, 2%);
            }
          }

          &-background {
            background: color(gray-background);
            width: 130px;
            height: 130px;
            position: absolute;
            border-radius: 50%;
            top: 5px;
            left: 5px;
          }
        }
      }

      &-reviews {
        margin-top: globalVars(ui-default-measure4x);

        &-totals {
          display: flex;
          align-items: baseline;
          justify-content: center;

          span {
            margin-right: globalVars(ui-default-measure)
          }
        }

        &-item {
          margin-top: 20px;
        }

        .ant-rate-star svg {
          fill: color(gray-background-dark)
        }
        .ant-rate-star-full svg {
          fill: color(primary)
        }
      }
    }

    &__data {
      margin-top: globalVars(ui-default-measure2x);

      span {
        @include font(14, 700);
      }
    }

    &__give,
    &__get {
      margin-top: globalVars(ui-default-measure2x);
      display: flex;
      flex-direction: column;
      align-items: center;

      .heading {
        text-align: center;
      }
    }

    &__give {
      .ant-tag {
        background: color(primary);
      }
    }

    &__get {
      .ant-tag {
        background: color(accent);
      }
    }
  }

  .pie {
    width: 162px;
    height: 162px;
    position: absolute;
    top: -11px;
    left: -11px;
    border-radius: 50%;
  }

  .pie1 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 84%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
    transform: rotate(-80deg);
  }

  .pie2 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 74%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
    transform: rotate(-40deg);
  }

  .pie3 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 64%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
  }

  .pie4 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 54%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
    transform: rotate(40deg);
  }

  .pie5 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 44%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
    transform: rotate(80deg);
  }

  .pie6 {
    background-image: conic-gradient(lighten(#F1F3F8, 2%) 34%, lighten(#6044E0, 20) 17%, darken(#6044E0, 10));
    transform: rotate(120deg);
  }
</style>
