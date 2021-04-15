<template>
  <div>
    <form @submit.prevent>
      <div class="form-group">
        <label for="model">Model</label>
        <input v-model="itemData.model" type="text" class="form-control" id="model" required />
        <p v-if="validateModel" class="text-danger">This field is required</p>
      </div>
      <div class="form-group">
        <label for="img">Image Link</label>
        <input v-model="itemData.image" type="text" class="form-control" id="img" required />
        <p v-if="validateImage" class="text-danger">This field is required</p>
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
    <p v-if="success" class="text-success mt-3">Added successfuly</p>
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
      },
      success: false,
      isFormSubmited: false
    };
  },
  computed: {
    validateModel() {
      return this.isFormSubmited && !this.itemData.model;
    },
    validateImage() {
      return this.isFormSubmited && !this.itemData.image;
    }
  },
  methods: {
    submitForm() {
      this.isFormSubmited = true;
      if (this.categoryId) {
        if (!this.validateForm()) return false;
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
            this.$emit("on-add", this.categoryId);
            this.success = true;
            setTimeout(() => {
              this.success = false;
            }, 2000);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => (this.isFormSubmited = false));
      } else {
        alert("Please select a category");
      }
    },
    validateForm() {
      return this.itemData.model && this.itemData.image;
    }
  }
};
</script>

<style>
</style>