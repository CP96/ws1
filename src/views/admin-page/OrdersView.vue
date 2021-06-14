<template>
  <section>
    <h2>Orders</h2>
     <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">
            User
          </th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in orders" :key="item.id">
          <td>{{ index + 1 }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import db from "@/data-provider";
export default {
  name: "OrdersView",
  data() {
    return {
        orders:[],
    };
  },
  mounted() {
    db.collection("ORDERS")
      .orderBy("orderDate")
      .onSnapshot((querySnapshot) => {
        this.orders = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return { id: doc.id, ...data };
        });
        console.log(this.orders)
      })
    //   .then(() => {
    //     console.log("Order Saved");
    //   })
    //   .catch((error) => {
    //     console.log(error);
      //});
  },
};
</script>

<style></style>
