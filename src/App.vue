<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://unpkg.com/purecss@1.0.1/build/base-min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/purecss@2.0.6/build/grids-responsive-min.css"
    />
    <Menu />
    <div id="main"><router-view /></div>
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";
export default {
  components: { Menu },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
@media (max-width: 768px) {
  .content {
    padding: 2%;
  }
}
</style>
