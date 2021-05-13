<template>
  <div class="home">
    <h1>Home</h1>
    <section class="content">
      <Items
        collection="SKIS"
        orderBy="model"
        :headers="['model', 'lenght', 'price']"
      />
      <Items
        collection="SNOWBOARDS"
        orderBy="model"
        :headers="['model', 'lenght', 'price']"
      />
      <Items
        collection="SKIBOOTS"
        orderBy="model"
        :headers="['model', 'size', 'price']"
      />
      <Items
        collection="BOOTS"
        orderBy="model"
        :headers="['model', 'size', 'price']"
      />
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import "@/initApp.js";
import Items from "@/components/Items.vue";

export default {
  name: "Home",
  components: {
    Items,
  },
  data() {
    return {};
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
