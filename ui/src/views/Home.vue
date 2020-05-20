<template>
  <div class="home">
    <Categories @category-click="getItems" />
    <Items v-if="items && items.length" :items="items" @on-delete="fetchItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Categories from "@/components/Categories.vue";
import Items from "@/components/Items.vue";

export default {
  name: "Home",
  components: {
    Categories,
    Items
  },
  data() {
    return {
      items: null
    };
  },
  mounted() {},
  methods: {
    getItems(catId) {
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
    fetchItems(catId){
      this.getItems(catId)
    }
  }
};
</script>
