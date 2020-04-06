import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as firebase from "firebase";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    courses: null,
    user: null,
  },
  getters: {
    get_courses(state) {
      return state.courses;
    },
    user(state) {
      return state.user;
    },
  },
  mutations: {
    set_courses(state, courses) {
      state.courses = courses;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async fetch_courses({ commit }) {
      try {
        const courses = await axios.get("https://localhost:44310/api/Courses");
        commit("set_courses", courses.data);
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
    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    getUserCourses({commit},payload){
        
    }
  },

  modules: {},
});
