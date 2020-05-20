<template>
  <div class="home">
    <section class="row mb-5">
      <Categories class="col-xs-12 col-md-6" @category-click="getItems" />
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

export default {
  name: "Home",
  components: {
    Categories,
    Items,
    InputForm
  },
  data() {
    return {
      items: null,
      catId: null
    };
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
    }
  }
};
</script>
