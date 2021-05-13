<template>
  <section>
    <h2>Boots</h2>

    <Items
      :items="boots"
      :headers="['model', 'lenght', 'price']"
      :enableEdit="true"
    />
  </section>
</template>

<script>
import "@/initApp.js";
import db from "@/data-provider";
import Items from "@/components/Items.vue";
export default {
  name: "Boots",
  components: {
    Items,
  },
  data() {
    return {
      boots: [],
    };
  },
  mounted() {
    db.collection("BOOTS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.boots.push(doc.data()));
      });
  },
};
</script>

<style></style>
