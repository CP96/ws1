<template>
  <section>
    <form class="pure-form pure-form-stacked" v-on:submit.prevent="onSubmit">
      <legend>Add new item:</legend>
      <div class="pure-g">
        <div
          class="pure-u-1 pure-u-md-1-3"
          v-for="property in fields"
          :key="property"
        >
          <label :for="property">
            <span>{{ property }}</span>
            <input
              type="text"
              :name="property"
              :id="property"
              class="pure-u-23-24"
              v-model="item[property]"
            />
          </label>
        </div>
      </div>
      <button type="submit" class="pure-button pure-button-primary">
        Submit
      </button>
    </form>
  </section>
</template>

<script>
import db from "@/data-provider";
import firebase from "firebase/app";
export default {
  name: "InsertItemForm",
  props: {
    fields: Array,
    collection: String,
  },
  data() {
    return {
      item: {},
    };
  },
  mounted() {
    console.log(this.fields);
    this.fields.forEach((field) => (this.item[field] = ""));
  },
  methods: {
    onSubmit() {
      console.log(this.item);

      this.item.createdAt = firebase.firestore.FieldValue.serverTimestamp();

      db.collection(this.collection)
        .add({ ...this.item })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
  },
};
</script>

<style></style>
