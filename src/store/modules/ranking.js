import repositoryFactory, { REPOSITORIES } from '@/store/repositories';

export const rankingNamespace = {
  module: 'ranking',
  mutations: {
    hydrateRankingMutation: 'hydrateRankingMutation'
  },
  getters: {
  },
  actions: {
    hydrateRanking: 'hydrateRanking',
  }
};

const rankingRepository = repositoryFactory(REPOSITORIES.RANKING);

export default {
  state: {
    list: {}
  },
  getters: {
  },
  mutations: {
    [rankingNamespace.mutations.hydrateRankingMutation](state, payload) {
      state.list = payload
    },
  },
  actions: {
    [rankingNamespace.actions.hydrateRanking]({commit}) {
      return rankingRepository(repo =>
        repo.get()
          .then(response => commit(rankingNamespace.mutations.hydrateRankingMutation, response))
          .catch(() => {throw new Error})
      );
    }
  }
};
