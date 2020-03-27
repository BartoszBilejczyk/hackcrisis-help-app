<template>
  <div class="navigation">
    <div
      class="item"
      :class="{'item--active': $route.name === 'Profile'}"
      @click="navigateTo('Profile')"
    >
      <AntIcon type="user"></AntIcon>
      <span>Profile</span>
    </div>
    <div
      class="item"
      :class="{'item--active': $route.name === 'People'}"
      @click="navigateTo('People')"
    >
      <AntIcon type="unordered-list"></AntIcon>
      <span>Help List</span>
    </div>
    <div
      class="item"
      :class="{'item--active': $route.name === 'Requests'}"
      @click="navigateTo('Requests')"
    >
      <AntIcon type="solution"></AntIcon>
      <div class="navigation-container">
        <span>Your requests</span>
        <AntTag v-if="unseen.length">{{ unseen.length }}</AntTag>
      </div>
    </div>
    <div
      class="item"
      :class="{'item--active': $route.name === 'Ranking'}"
      @click="navigateTo('Ranking')"
    >
      <AntIcon type="bar-chart"></AntIcon>
      <span>Leaderboard</span>
    </div>
  </div>
</template>

<script>
  import { Icon as AntIcon, Tag as AntTag } from 'ant-design-vue';
  import { mapState } from 'easy-vuex-modules';

  export default {
    name: 'Navigation',
    components: {
      AntIcon,
      AntTag
    },
    computed: {
      ...mapState(['requests.unseen'])
    },
    methods: {
      navigateTo(name) {
        this.$router.push({ name, query: {...this.$route.query} });
      }
    }
  }
</script>

<style scoped lang="scss">
  .navigation {
    display: flex;
    position: fixed;
    bottom: 0;
    height: 60px;
    width: 100vw;
    justify-content: space-around;
    justify-content: space-evenly;
    align-items: center;
    z-index: 10000;
    border-top: 1px solid color(gray-background-dark);
    background: white;

    @include md-up {
      position: static;
      display: flex;
      flex-direction: column;
      height: 100vh;
      width: 240px;
      justify-content: initial;
      align-items: baseline;
      border: none;
    }

    padding: globalVars(ui-default-measure3x) globalVars(ui-default-measure) globalVars(ui-default-measure3x) globalVars(ui-default-measure4x);
    box-shadow: globalVars(ui-default-box-shadow--light);

    .item {
      cursor: pointer;
      text-transform: uppercase;
      @include font(14, 700);
      padding: globalVars(ui-default-measure2x) 0;
      display: flex;
      align-items: center;

      span {
        display: none;

        @include md-up {
          display: block;
        }
      }

      &--active {
        .anticon svg,

        span {
          color: color(accent);
        }
      }

      .anticon svg {
        height: globalVars(ui-default-measure3x);
        width: globalVars(ui-default-measure3x);
        margin-right: globalVars(ui-default-measure2x);
      }

      &:hover {
        color: color(accent);
      }
    }

    &-container {
      display: flex;
      align-items: center;

      .ant-tag {
        margin-left: 8px;
        background: color(accent);
      }
    }
  }
</style>
