<template>
  <section>
    <h2>Skis</h2>

    <Items
      collection="SKIS"
      orderBy="createdAt"
      :headers="['model', 'lenght', 'price', 'available']"
      :enableEdit="true"
    />
    <InsertItemForm
      :fields="['model', 'lenght', 'price', 'available']"
      collection="SKIS"
    />
  </section>
</template>

<script>
import "@/initApp.js";
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
    };
  },
  mounted() {},
};
</script>

<style></style>
