<template>
  <div class="home">
    <nav>
      <button type="button" @click="logout">Log Out</button>
      </nav>
    <div class="row mb-5">
      <div class="col-xs-12 col-md-6">
        <button class="btn btn-primary" @click="toggleCategories">{{categoriesBtnLabel}}</button>
      </div>

      <Weather class="col-xs-12 col-md-6" />
    </div>
    <section class="row mb-5">
      <Categories v-if="showCategories" class="col-xs-12 col-md-6" @category-click="getItems" />
      <div v-else class="col-xs-12 col-md-6"></div>
      <InputForm class="col-xs-12 col-md-6" :category-id="catId" @on-add="fetchItems" />
      <!-- <InputForm v-if="catId" class="col-xs-12 col-md-6" category-id="catId"  /> -->
    </section>

    <Items v-if="items && items.length" :items="items" @on-delete="fetchItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import Categories from "@/components/Categories.vue";
import Items from "@/components/Items.vue";
import InputForm from "@/components/InputForm.vue";
import Weather from "@/components/Weather.vue";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  components: {
    Categories,
    Items,
    InputForm,
    Weather
  },
  data() {
    return {
      items: null,
      catId: null,
      showCategories: false,
      displayForm: false
    };
  },
  computed: {
    categoriesBtnLabel() {
      return this.showCategories ? "Hide Categories" : "Display Categories";
    }
  },
  mounted() {},
  methods: {
    logout(){
      firebase
    .auth()
    .signOut()
    .then(() => console.log("signed out"))
    .catch((error) => console.log(error));
    }
  }
};
</script>
