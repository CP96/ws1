<template>
  <div class="auth">
    <div class="row">
      <div id="firebaseui-auth-container"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import firebase from "firebase/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import "./../../initApp";
import uiConfig from "./authConfig";

export default {
  name: "Auth",
  data() {
    return {
      ui: null,
    };
  },
  mounted() {
    this.ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    this.ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
