import * as firebase from "firebase";
import axios from "axios";
export default ({
    state: {
        user: null,
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
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
        async storeUser(user){
            try {
                await axios.post(
                    `https://localhost:44310/api/User`, user
                );
            } catch (e) {
                console.log(e);
            }
        },
        signUserIn({ commit }, payload) {
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then((user) => {
                    const newUser = {
                        id: user.uid,
                    };
                    commit("setUser", newUser);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
