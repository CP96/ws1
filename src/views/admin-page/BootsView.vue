<template>
  <section>
    <h2>Boots</h2>

    <Items
      collection="BOOTS"
      orderBy="createdAt"
      :headers="['model', 'size', 'price', 'count']"
      :enableEdit="true"
      :enableDelete="true"
      v-on:edit="editItem"
    />
    <InsertItemForm
      :fields="[
        { title: 'model', type: 'text' },
        { title: 'size', type: 'number' },
        { title: 'price', type: 'number' },
        { title: 'count', type: 'number' },
      ]"
      collection="BOOTS"
      :editable-item="editableItem"
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
