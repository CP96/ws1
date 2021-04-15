import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from "firebase/app";
import "firebase/auth";
import "./initApp.js";
import db from "@/data-provider";

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
      router.push({ path: 'login' });
    }
  },
  function (error) {
    console.log(error);
  }
);

var docRef = db.collection("skis").doc("HPmPzYBtvFs2uxXqZnE0");

    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });