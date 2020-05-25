<template>
  <div class="home">
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
import axios from "axios";
import Categories from "@/components/Categories.vue";
import Items from "@/components/Items.vue";
import InputForm from "@/components/InputForm.vue";
import Weather from "@/components/Weather.vue";

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
    getItems(catId) {
      this.catId = catId;
      axios
        .get("http://localhost:3000/Items", {
          params: {
            catId: catId
          }
        })
        .then(response => response.data)
        .then(response => {
          console.log(response);
          this.items = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    fetchItems(catId) {
      this.getItems(catId);
    },
    toggleCategories() {
      this.showCategories = !this.showCategories;
      if (!this.showCategories) {
        this.catId = null;
      }
    }
  }
};
</script>
