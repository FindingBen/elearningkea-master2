import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./components/baseElements/_loadBase";
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyCpQPD4NQg6WDQpdgGwW96ekfBxyOeMw6E",
      authDomain: "elearningauthentication.firebaseapp.com",
      databaseURL: "https://elearningauthentication.firebaseio.com",
      projectId: "elearningauthentication",
      storageBucket: "elearningauthentication.appspot.com",
      messagingSenderId: "951678726561",
      appId: "1:951678726561:web:82526ab252526425e0dbe0",
      measurementId: "G-PLC62KZ4QN"
    })
  }
})
