<template>
  <div class="admin">
    <h1>ADMIN</h1>
    <section class="content">
      <Items :items="skis" :headers="['model', 'lenght', 'price', ]" :enableEdit="true" />
      <Items :items="snowboards" :headers="['model', 'lenght', 'price']" :enableEdit="true" />
      <Items :items="skiboots" :headers="['model', 'lenght', 'price']" :enableEdit="true" />
      <Items :items="boots" :headers="['model', 'lenght', 'price']" :enableEdit="true" />
    </section>
  </div>
</template>

<script>
import "@/initApp.js";
import db from "@/data-provider";
import Items from "@/components/Items.vue";

export default {
  name: "Admin",
  components: {
    Items,
  },
  data() {
    return {
      skis: [],
      snowboards: [],
      skiboots: [],
      boots: [],
    };
  },
  computed: {
    categoriesBtnLabel() {
      return this.showCategories ? "Hide Categories" : "Display Categories";
    },
  },
  mounted() {
    db.collection("SKIS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.skis.push(doc.data()));
      });

    db.collection("SNOWBOARDS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.snowboards.push(doc.data()));
      });

    db.collection("SKIBOOTS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.skiboots.push(doc.data()));
      });

    db.collection("BOOTS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.boots.push(doc.data()));
      });
  },
  methods: {},
};
</script>

<style>
</style>