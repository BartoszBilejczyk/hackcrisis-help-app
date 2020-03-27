import Vue from 'vue';
import moment from 'moment';

import App from './App.vue';
import router from './router';
import store from './store';
import Antd from "ant-design-vue/es";

// import { VueStateMachine } from 'vue-xstate-plugin';
// import { requestsMachine } from './machines/requests/machine';
import 'ant-design-vue/dist/antd.css';
import '@/styles/main.scss';

Vue.prototype.$log = console.log;
Vue.prototype.$moment = moment;

Vue.config.productionTip = false;
Vue.use(Antd);

// Vue.use(VueStateMachine, [
//   {
//     config: requestsMachine,
//     logState: true,
//     logContext: true,
//     persistState: true
//   }
// ]);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
