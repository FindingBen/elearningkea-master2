import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        courses: null,
        course: null,
        user: null,
    },
    getters: {
        get_courses(state) {
            return state.courses;
        },
        get_course(state) {
            return state.course;
        },
        user(state) {
            return state.user;
        },
    },
    mutations: {
        set_courses(state, courses) {
            state.courses = courses;
        },
        set_course(state, course) {
            state.course = course;
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        async fetch_courses({ commit }) {
            try {
                const courses = await axios.get(
                    "https://localhost:44310/api/courses"
                );
                commit("set_courses", courses.data);
            } catch (e) {
                console.log(e);
            }
        },
        async fetch_course({ commit }, id) {
            try {
                const course = await axios.get(
                    `https://localhost:44310/api/courses/${id}`
                );
                commit("set_course", course.data);
            } catch (e) {
                console.log(e);
            }
        },
        signUserUp({ commit }, payload) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then((user) => {
                    console.log(user);
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                    };
                    commit("setUser", newUser);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },

    modules: {},
});
