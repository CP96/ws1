<template>
  <section>
    <h2>SkiBoots</h2>

    <Items
      :items="skiboots"
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
  name: "SkiBoots",
  components: {
    Items,
  },
  data() {
    return {
      skiboots: [],
    };
  },
  mounted() {
    db.collection("SKIBOOTS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.skiboots.push(doc.data()));
      });
  },
};
</script>

<style></style>
