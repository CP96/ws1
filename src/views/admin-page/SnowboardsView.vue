<template>
  <section>
    <h2>Snowboards</h2>

    <Items
      :items="snowboards"
      :headers="['model', 'lenght', 'price']"
      :enableEdit="true"
    />
    <InsertItemForm :fields="['model', 'lenght', 'price', 'available']" collection="SNOWBOARDS" />
  </section>
</template>

<script>
import "@/initApp.js";
import db from "@/data-provider";
import Items from "@/components/Items.vue";
import InsertItemForm from "@/components/InsertItemForm.vue";

export default {
  name: "Snowboards",
  components: {
    Items,
    InsertItemForm,
  },
  data() {
    return {
      snowboards: [],
    };
  },
  mounted() {
    db.collection("SNOWBOARDS")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => this.snowboards.push(doc.data()));
      });
  },
};
</script>

<style></style>
