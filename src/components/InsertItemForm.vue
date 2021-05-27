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
      <button type="reset" class="button-error pure-button" v-on:click.prevent="createDefaultItem" >Reset</button>
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
    editableItem: Object,
  },
  data() {
    return {
      item: {},
    };
  },
  watch: {
    editableItem(newItem) {
      this.item = newItem;
    },
  },

  mounted() {
    console.log(this.fields);
    this.createDefaultItem();
  },
  methods: {
    onSubmit() {
      console.log(this.item);

      this.item.createdAt = firebase.firestore.FieldValue.serverTimestamp();

      db.collection(this.collection)
        .doc(this.item?.id)
        .set({ ...this.item })
        .then(() => {
          //console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },

    createDefaultItem() {
      this.item = {};
      this.fields.forEach((field) => (this.item[field] = ""));
    },
  },
};
</script>

<style></style>
