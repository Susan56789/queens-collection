
import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoggedIn: false,
    },
    mutations: {
        setLoggedIn(state, isLoggedIn) {
            state.isLoggedIn = isLoggedIn;
        },
    },
    actions: {
        login({ commit }) {
            // Your login logic here
            commit('setLoggedIn', true);
        },
        logout({ commit }) {
            // Your logout logic here
            commit('setLoggedIn', false);
        },
    },
    getters: {
        isLoggedIn: (state) => state.isLoggedIn,
    },
});
