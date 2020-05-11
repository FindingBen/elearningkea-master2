import * as firebase from "firebase";
import axios from "axios";

export default {
    state: {
        users: null,
        user: null,
    },
    getters: {
        users(state) {
            return state.users;
        },
        user(state) {
            return state.user;
        },
    },
    user: {
        userId: "",
    },
    mutations: {
        setUsers(state, payload) {
            state.users = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        signUserUp({ commit, dispatch }, payload) {
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then(response => {
                    const newUser = {
                        userId: response.user.uid,
                        email: payload.email,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                    };
                    console.log(response);
                    commit("setUsers", newUser);
                    dispatch("createUser", newUser);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async createUser({ commit }, user) {
            try {
                await axios.post(`https://elearningkeaapi.azurewebsites.net/api/User`, user);

                commit();
            } catch (e) {
                console.log(e);
            }
        },
        signUserIn({ commit }, payload) {
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then(response => {
                    const newUser = {
                        id: response.user.uid,
                    };
                    commit("setUsers", newUser);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        async fetch_users({ commit }) {
            try {
                const users = await axios.get("https://elearningkeaapi.azurewebsites.net/api/User");
                commit("setUsers", users.data);
            } catch (e) {
                console.log(e);
            }
        },

        async fetch_user({ commit }, id) {
            try {
                const user = await axios.get(`https://elearningkeaapi.azurewebsites.net/api/User/${id}`);
                commit("setUser", user.data);
                console.log(user);
            } catch (e) {
                console.log(e);
            }
        },
    },
};
