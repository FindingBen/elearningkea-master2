import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";

import courses from "./modules/courses";
import authentication from "./modules/authentication";
import notes from "./modules/notes";
import account from "./modules/account";
import quiz from "./modules/quiz";
import responsive from "./modules/responsive";
Vue.use(Vuex);

export default new Vuex.Store({
    state: { appAlert: null },
    getters: {
        get_app_alert(state) {
            return state.appAlert;
        },
    },
    mutations: {
        set_app_alert(state, appAlert) {
            state.appAlert = appAlert;
        },
        remove_app_alert(state) {
            state.appAlert = null;
        },
    },
    actions: {
        set_app_alert({ commit }, appAlert) {
            commit("set_app_alert", appAlert);
        },
        remove_app_alert({ commit }) {
            commit("remove_app_alert");
        },
    },
    modules: {
        courses,
        authentication,
        notes,
        account,
        quiz,
        responsive,
    },
});
