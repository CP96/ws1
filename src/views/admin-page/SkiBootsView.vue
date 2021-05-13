<template>
  <section>
    <h2>SkiBoots</h2>

    <Items
      collection="SKIBOOTS"
      orderBy="createdAt"
      :headers="['model', 'size', 'price']"
      :enableEdit="true"
    />
    <InsertItemForm
      :fields="['model', 'size', 'price', 'available']"
      collection="SKIBOOTS"
    />
  </section>
</template>

<script>
import "@/initApp.js";

import Items from "@/components/Items.vue";
import InsertItemForm from "@/components/InsertItemForm.vue";
export default {
  name: "SkiBoots",
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
