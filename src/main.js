import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app";
import "firebase/auth";
import "./initApp.js";
//mport db from "./data-provider";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


firebase.auth().onAuthStateChanged(
  function (user) {
    if (user) {
      console.log("user loged in");
    } else {
      console.log("user not loged in");
    }
  },
  function (error) {
    console.log(error);
  }
);