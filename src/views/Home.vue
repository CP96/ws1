<template>
  <div class="home">
    <h1>Home</h1>
    <section class="content">
      <h2>Skis</h2>
      <Items
        collection="SKIS"
        orderBy="model"
        :headers="['model', 'lenght', 'price']"
        :showReserveBtn="true"
      />
      <h2>Snowboards</h2>
      <Items
        collection="SNOWBOARDS"
        orderBy="model"
        :headers="['model', 'lenght', 'price']"
        :showReserveBtn="true"
      />
      <h2>SkiBoots</h2>
      <Items
        collection="SKIBOOTS"
        orderBy="model"
        :headers="['model', 'size', 'price']"
        :showReserveBtn="true"
      />
      <h2>Boots</h2>
      <Items
        collection="BOOTS"
        orderBy="model"
        :headers="['model', 'size', 'price']"
        :showReserveBtn="true"
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
