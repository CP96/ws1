<template>
  <section>
    <h2>Skis</h2>

    <Items
      collection="SKIS"
      orderBy="createdAt"
      :headers="['model', 'lenght', 'price', 'available', 'count']"
      :enableEdit="true"
      :enableDelete="true"
      v-on:edit="editItem"
    />
    <InsertItemForm
      :fields="[
        { title: 'model', type: 'text' },
        { title: 'lenght', type: 'number' },
        { title: 'price', type: 'number' },
        { title: 'count', type: 'number' },
      ]"
      collection="SKIS"
      :editable-item="editableItem"
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
