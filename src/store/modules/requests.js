import repositoryFactory, { REPOSITORIES } from '@/store/repositories';
import { people } from '@/store';

export const requestsNamespace = {
  module: 'requests',
  mutations: {
    hydrateRequestsMutation: 'hydrateRequestsMutation',
    addRequestMutation: 'addRequestMutation',
    cleanUnseenMutation: 'cleanUnseenMutation',
    updateRequestMutation: 'updateRequestMutation'
  },
  getters: {
  },
  actions: {
    hydrateRequests: 'hydrateRequests',
    addRequest: 'addRequest',
  }
};

const requestsRepository = repositoryFactory(REPOSITORIES.REQUESTS);

export default {
  state: {
    list: [],
    added: [],
    unseen: []
  },
  getters: {
  },
  mutations: {
    [requestsNamespace.mutations.hydrateRequestsMutation](state, payload) {
      state.list = payload;
    },
    [requestsNamespace.mutations.addRequestMutation](state, payload) {
      state.added = state.added.concat(payload);
      state.unseen = state.unseen.concat({ id: payload.id, mode: payload.mode, status : payload.status })
    },
    [requestsNamespace.mutations.cleanUnseenMutation](state) {
      state.unseen = [];
    },
    [requestsNamespace.mutations.updateRequestMutation](state, {status, id, review}) {
      const addedIndex = state.added.findIndex(item => item.id === id);
      const listIndex = state.list.findIndex(item => item.id === id);

      if (addedIndex > -1) {
        state.added = [
          ...state.added.slice(0, addedIndex),
          {...state.added[addedIndex], status, review },
          ...state.added.slice(addedIndex + 1)
        ];
      } else if (listIndex > -1) {
        state.list = [
          ...state.list.slice(0, listIndex),
          {...state.list[listIndex], status, review },
          ...state.list.slice(listIndex + 1)
        ];
      }
    },
  },
  actions: {
    [requestsNamespace.actions.hydrateRequests]({commit}) {
      return requestsRepository(repo =>
        repo.get()
          .then(response => commit(requestsNamespace.mutations.hydrateRequestsMutation, response))
          .catch(() => {throw new Error})
      );
    },
    [requestsNamespace.actions.addRequest]({commit}, payload) {
      return new Promise(resolve => setTimeout(() => {
        commit(requestsNamespace.mutations.addRequestMutation, payload);
        commit(people.mutations.removeFromListMutation, {
          id: payload.user.id,
          mode: payload.mode
        }, { root: true });
        resolve();
      }, 800));
    }
  }
};
