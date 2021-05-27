<template>
  <section>
    <h2>Snowboards</h2>

    <Items
      collection="SNOWBOARDS"
      orderBy="createdAt"
      :headers="['model', 'lenght', 'price', 'available']"
      :enableEdit="true"
      v-on:edit="editItem"
    />
    <InsertItemForm
      :fields="['model', 'lenght', 'price', 'available']"
      collection="SNOWBOARDS"
      :editable-item="editableItem"
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
    return {
      editableItem: null,
    };
  },
  mounted() {},

  methods: {
    editItem(item) {
      this.editableItem = item;
    },
  },
};
</script>

<style></style>
