import Vue from 'vue';
import moment from 'moment'

import App from './App.vue';
import router from './router';
import { VueStateMachine } from 'vue-xstate-plugin';
import { breakfastMachine, dinnerMachine } from './machines';
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;

Vue.use(VueStateMachine, [
  {
    config: breakfastMachine,
    logState: true,
    logContext: true,
    persistState: true
  },
  {
    config: dinnerMachine,
    logState: true,
    logContext: true,
    persistState: true
  }
]);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
