<template>
  <div>
    <ul v-if="categories && categories.length" class="list-group">
      <li
        v-for="cat in categories"
        v-bind:key="cat.id"
        class="list-group-item"
        :class="{'active':cat.id===activeCategoryId}"
      >
        <span @click="onCategoryClick(cat)">{{cat.title}}</span>
      </li>
    </ul>
    <div v-if="items && items.length">{{items}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Categories",
  props: {
    msg: String
  },
  data() {
    return {
      categories: null,
      items: null,
      activeCategoryId: null
    };
  },
  mounted() {
    this.getCategories();
  },
  methods: {
    getCategories() {
      axios
        .get("http://localhost:3000/Categories")
        .then(response => response.data)
        .then(response => {
          console.log(response);
          this.categories = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onCategoryClick(cat) {
      this.activeCategoryId = cat.id;
      this.$emit("category-click", cat.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
