<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="header in headers" :key="header">
            {{ header.toUpperCase() }}
          </th>
          <th scope="col" v-if="enableEdit">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td v-for="columnName in headers" :key="columnName">
            {{ item[columnName] || "NA" }}
          </td>
          <td v-if="enableEdit">
            <button
              class="button-error pure-button"
              type="button"
              v-on:click="onDelete(item)"
            >
              DELETE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "@/data-provider";
export default {
  name: "Items",
  props: {
    collection: String,
    headers: Array,
    enableEdit: Boolean,
    orderBy: String,
  },

  data() {
    return { items: [] };
  },
  mounted() {
    db.collection(this.collection)
      .orderBy(this.orderBy)
      .onSnapshot((querySnapshot) => {
        this.items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
  },
  methods: {
    onDelete({ id }) {
      db.collection(this.collection)
        .doc(id)
        .delete()
        .then(() => {
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },
  },
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
