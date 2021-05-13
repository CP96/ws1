<template>
  <div class="admin">
    <h1>ADMIN</h1>
    <nav>
      <div class="pure-menu pure-menu-horizontal">
        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <router-link
              :to="{ name: 'Skis', params: {} }"
              class="pure-menu-link"
              >Skis</router-link
            >
          </li>
          <li class="pure-menu-item">
            <router-link
              :to="{ name: 'Snowboards', params: {} }"
              class="pure-menu-link"
              >Snowboards</router-link
            >
          </li>
          <li class="pure-menu-item">
            <router-link
              :to="{ name: 'SkiBoots', params: {} }"
              class="pure-menu-link"
              >SkiBoots</router-link
            >
          </li>
          <li class="pure-menu-item">
            <router-link
              :to="{ name: 'Boots', params: {} }"
              class="pure-menu-link"
              >Boots</router-link
            >
          </li>
        </ul>
      </div>
    </nav>
    <section class="content">
      <router-view />
    </section>
  </div>
</template>

<script>
export default {
  name: "Admin",
  components: {},
  data() {
    return {
      
    };
  },
  computed: {
    categoriesBtnLabel() {
      return this.showCategories ? "Hide Categories" : "Display Categories";
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style></style>
