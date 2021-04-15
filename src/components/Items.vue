<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Image</th>
          <th scope="col">Model</th>
          <th scope="col">Availability</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" :key="item.id">
          <td>{{index+1}}</td>
          <td>
            <img :src="item.image" class="img-fluid" style="width: auto;  max-height:200px;"/>
          </td>
          <td>{{item.model}}</td>
          <td>{{item.availability}}</td>
          <td>
            <button class="btn btn-danger" @click="onDelete(item)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Items",
  props: {
    items: Array
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    onDelete({ id, catId }) {
      axios.delete("http://localhost:3000/Items/" + id).then(() => {
        this.$emit("on-delete", catId);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
