<template>
  <div class="app">
    <Navigation></Navigation>
    <div class="app-content">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Navigation from '@/components/navigation/Navigation'
  import providers from '@/common/providers';

  import { mapState, mapActions } from 'easy-vuex-modules';
  import { user } from '@/store';

  export default {
    name: 'App',
    components: {
      Navigation
    },
    provide: providers,
    async mounted() {
      if (!this.details.id) {
        await this.hydrateUser();
      }
    },
    computed: {
      ...mapState(['user.details'])
    },
    methods: {
      ...mapActions([user.actions.hydrateUser])
    }
  };
</script>

<style lang="scss">
  .app {
    display: flex;
    max-width: 100vw;
    overflow-x: hidden;

    @include md-up {
      max-width: none;
    }

    &-content {
      flex: 1;
      height: calc(100vh - 60px);
      overflow-y: auto;
      padding: globalVars(ui-default-measure3x) globalVars(ui-default-measure4x);
      background: lighten(#F1F3F8, 2%);
      padding-bottom: 80px;

      @include md-up {
        height: 100vh;
        padding-bottom: globalVars(ui-default-measure3x);
      }
    }
  }
</style>
