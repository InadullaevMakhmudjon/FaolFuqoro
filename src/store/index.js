import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
  },
  mutations: {
    setUser(state, user) {
      // eslint-disable-next-line no-param-reassign
      state.user = user;
    },
    removeUser(state) {
      // eslint-disable-next-line no-param-reassign
      state.user = null;
    },
  },
  actions: {
    login({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user));
      commit('setUser', user);
    },
    logout({ commit }) {
      localStorage.removeItem('user');
      commit('removeUser');
    },
  },
  modules: {
  },
  strict: true,
});
