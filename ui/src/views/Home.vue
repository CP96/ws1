<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  mounted() {
    axios
      .get("http://localhost:3000/posts", {
        params: {
          ID: 12345
        }
      })
      .then(response=>response.data)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
  }
};
</script>
