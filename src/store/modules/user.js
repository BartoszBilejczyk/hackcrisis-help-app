import repositoryFactory, { REPOSITORIES } from '@/store/repositories';

export const userNamespace = {
  module: 'user',
  mutations: {
    hydrateUserMutation: 'hydrateUserMutation'
  },
  getters: {
  },
  actions: {
    hydrateUser: 'hydrateUser',
  }
};

const userRepository = repositoryFactory(REPOSITORIES.USER);

export default {
  state: {
    details: []
  },
  getters: {
  },
  mutations: {
    [userNamespace.mutations.hydrateUserMutation](state, payload) {
      state.details = payload
    },
  },
  actions: {
    [userNamespace.actions.hydrateUser]({commit}) {
      return userRepository(repo =>
        repo.get()
          .then(response => commit(userNamespace.mutations.hydrateUserMutation, response))
          .catch(() => {throw new Error})
      )
    }
  }
};
