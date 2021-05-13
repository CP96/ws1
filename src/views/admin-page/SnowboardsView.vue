<template>
  <section>
    <h2>Snowboards</h2>

    <Items
      collection="SNOWBOARDS"
      orderBy="createdAt"
      :headers="['model', 'lenght', 'price', 'available']"
      :enableEdit="true"
    />
    <InsertItemForm
      :fields="['model', 'lenght', 'price', 'available']"
      collection="SNOWBOARDS"
    />
  </section>
</template>

<script>
import "@/initApp.js";

import Items from "@/components/Items.vue";
import InsertItemForm from "@/components/InsertItemForm.vue";

export default {
  name: "Snowboards",
  components: {
    Items,
    InsertItemForm,
  },
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style></style>
