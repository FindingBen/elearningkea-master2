import * as firebase from "firebase";
import axios from 'axios';

export default ({
    state: {
        user: [],
    },
    getters: {
        user(state) {
            return state.user;
        },
    },
    user:{
        userId:"",
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
    },
    actions: {
        signUserUp({ commit, dispatch }, payload) {
           
            firebase
                .auth()
                .createUserWithEmailAndPassword(payload.email, payload.password)
                .then( (response) => {         
                    
                        const newUser = {
                        userId: response.user.uid,
                        email: payload.email,
                        firstName: payload.firstName,
                        lastName: payload.lastName
                        
                    }
                    console.log(response)
                    commit("setUser", newUser);
                    dispatch("createUser",newUser);
                   
                   
                })
                .catch((error) => {
                    console.log(error);
                });
            
        },
        async createUser({ commit }, user) {
        
            try {
                await axios.post(
                    `https://localhost:44310/api/User`, user
                );
               
                commit();
            } catch (e) {
                console.log(e);
            }
        },
        signUserIn({ commit }, payload) {
            firebase
                .auth()
                .signInWithEmailAndPassword(payload.email, payload.password)
                .then((response) => {
                    const newUser = {
                        id: response.user.uid,
                    };       
                    commit("setUser", newUser);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
});
