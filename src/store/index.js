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
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        courses,
        authentication,
        notes,
        account,
        quiz,
        responsive,
    },
});
