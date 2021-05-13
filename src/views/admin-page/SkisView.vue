<template>
  <section>
    <h2>Skis</h2>

    <Items
      :items="skis"
      :headers="['model', 'lenght', 'price', 'available']"
      :enableEdit="true"
    />
    <InsertItemForm :fields="['model', 'lenght', 'price', 'available']" collection="SKIS" />
  </section>
</template>

<script>
import "@/initApp.js";
import db from "@/data-provider";
import Items from "@/components/Items.vue";
import InsertItemForm from "@/components/InsertItemForm.vue";
export default {
  name: "Skis",
  components: {
    Items,
    InsertItemForm,
  },
  data() {
    return {
      skis: [],
    };
  },
  mounted() {
    db.collection("SKIS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.skis.push(doc.data()));
      });
  },
};
</script>

<style></style>
