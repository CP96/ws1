<template>
  <div>
    <form @submit.prevent>
      <div class="form-group">
        <label for="model">Model</label>
        <input v-model="itemData.model" type="text" class="form-control" id="model" required />
      </div>
      <div class="form-group">
        <label for="availability">Availability</label>
        <select
          v-model="itemData.availability"
          class="custom-select"
          name="availibility"
          id="availibility"
        >
          <option selected value="true">True</option>
          <option value="false">False</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent @mouseover="submitForm">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "InputForm",
  props: ["categoryId"],
  data() {
    return {
      itemData: {
        model: "",
        availability: true,
        image: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (this.categoryId) {
        console.log(this.itemData);
        this.itemData.catId = this.categoryId;
        axios
          .post("http://localhost:3000/Items", this.itemData)
          .then(response => {
            console.log(response);
            this.itemData = {
              model: "",
              availability: true,
              image: ""
            };
            this.$emit("on-add",this.categoryId)
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        alert("PULA");
      }
    }
  }
};
</script>

<style>
</style>