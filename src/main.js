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
    apiKey: "AIzaSyCpQPD4NQg6WDQpdgGwW96ekfBxyOeMw6E",
    authDomain: "elearningauthentication.firebaseapp.com",
    databaseURL: "https://elearningauthentication.firebaseio.com",
    projectId: "elearningauthentication",
    storageBucket: "elearningauthentication.appspot.com",
    messagingSenderId: "951678726561",
    appId: "1:951678726561:web:82526ab252526425e0dbe0",
    measurementId: "G-PLC62KZ4QN",
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
