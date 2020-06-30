import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as firebase from "firebase";
import VueYouTubeEmbed from "vue-youtube-embed";
import "./components/baseElements/_loadBase";
import vuetify from "@/plugins/vuetify";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.config.productionTip = false;

Vue.use(VueYouTubeEmbed);

let app = "";

const firebaseConfig = {
    apiKey: "AIzaSyATcwMNwFp4GtxG2ntYr0RBl0WzAk5R6_c",
    authDomain: "e-learning-kea.firebaseapp.com",
    databaseURL: "https://e-learning-kea.firebaseio.com",
    projectId: "e-learning-kea",
    storageBucket: "e-learning-kea.appspot.com",
    messagingSenderId: "929724896846",
    appId: "1:929724896846:web:c12db6a70be56bd29e951f",
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        new Vue({
            el: "#app",
            router,
            store,
            vuetify,
            render: h => h(App),
        }).$mount("#app");
    }
});
