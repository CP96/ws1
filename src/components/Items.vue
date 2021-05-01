<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="header in headers" :key="header">{{header.toUpperCase()}}</th>
          <th scope="col" v-if="enableEdit">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item,index) in items" :key="item.id">
          <td>{{index+1}}</td>
          <td v-for="columnName in headers" :key="columnName">{{item[columnName] || "NA"}}</td>
          <td v-if="enableEdit">
            <button class="button-error pure-button" type="button">DELETE</button>
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
    items: Array,
    headers: Array,
    enableEdit: Boolean,
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
