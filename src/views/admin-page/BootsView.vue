<template>
  <section>
    <h2>Boots</h2>

    <Items
      collection="BOOTS"
      orderBy="createdAt"
      :headers="['model', 'size', 'price']"
      :enableEdit="true"
    />
    <InsertItemForm
      :fields="['model', 'size', 'price', 'available']"
      collection="BOOTS"
    />
  </section>
</template>

<script>
import "@/initApp.js";

import Items from "@/components/Items.vue";
import InsertItemForm from "@/components/InsertItemForm.vue";
export default {
  name: "Boots",
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
