import Vue from 'vue';
import Vuex from 'vuex';
import { namespace, createModuleMap } from 'easy-vuex-modules/src';

import peopleModule, { peopleNamespace } from './modules/people';
import rankingModule, { rankingNamespace } from './modules/ranking';
import requestsModule, { requestsNamespace } from './modules/requests';
import userModule, { userNamespace } from './modules/user';

Vue.use(Vuex);

const storeInstance = new Vuex.Store({
  modules: namespace({
    people: peopleModule,
    ranking: rankingModule,
    requests: requestsModule,
    user: userModule
  })
});
export const people = createModuleMap(peopleNamespace);
export const ranking = createModuleMap(rankingNamespace);
export const requests = createModuleMap(requestsNamespace);
export const user = createModuleMap(userNamespace);

export default storeInstance;
