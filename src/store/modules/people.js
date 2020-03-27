import repositoryFactory, { REPOSITORIES } from '@/store/repositories';

export const peopleNamespace = {
  module: 'people',
  mutations: {
    hydratePeopleMutation: 'hydratePeopleMutation',
    addPersonMutation: 'addPersonMutation',
    removeFromListMutation: 'removeFromListMutation'
  },
  getters: {
  },
  actions: {
    hydratePeople: 'hydratePeople',
    addPerson: 'addPerson'
  }
};

const peopleRepository = repositoryFactory(REPOSITORIES.PEOPLE);

export default {
  state: {
    list: {
      get: [],
      give: []
    }
  },
  getters: {
  },
  mutations: {
    [peopleNamespace.mutations.hydratePeopleMutation](state, payload) {
      state.list = payload
    },
    [peopleNamespace.mutations.addPersonMutation](state, {person, mode}) {
      state.list[mode] = state.list[mode].concat(person);
    },
    [peopleNamespace.mutations.removeFromListMutation](state, {id, mode}) {
      state.list[mode] = state.list[mode].filter(item => item.id !== id);
    }
  },
  actions: {
    [peopleNamespace.actions.hydratePeople]({commit}) {
      return peopleRepository(repo =>
        repo.get()
          .then(response => commit(peopleNamespace.mutations.hydratePeopleMutation, response))
          .catch(() => {throw new Error})
      );
    },
    [peopleNamespace.actions.addPerson]({commit}, {person, mode}) {
      return new Promise(resolve => setTimeout(() => {
        commit(peopleNamespace.mutations.addPersonMutation, {person, mode});
        resolve();
      }, 300));
    }
  }
};
