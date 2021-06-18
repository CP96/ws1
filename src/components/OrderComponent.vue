<template>
  <div v-if="items">
    <h3>{{ title }}</h3>
    <div v-for="(item, index) in items" :key="index">
      <p>
        Model: {{ item.model }} , {{ size(item) }} , Count: {{ item.count }} ,
        Price: {{ item.price }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderComponent",
  props: {
    items: Array,
    title: String,
  },
  methods: {
    size(item) {
      if (item.size) {
        return "Size: " + item.size;
      } else if (item.lenght) {
        return "Length: " + item.lenght;
      }
    },
  },
};
</script>

<style></style>
