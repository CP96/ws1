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
          <th scope="col">Order Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in orders">
          <tr :key="index + '1'">
            <td>{{ index + 1 }}</td>
            <td>{{ item.id }}</td>
            <td>{{ item.orderDate.toDate().toDateString() }}</td>
            <td>
              <button
                type="button"
                class="pure-button button-secondary"
                v-on:click="displayDetails(item)"
              >
                View Order
              </button>
            </td>
          </tr>
          <tr :key="index + '2'" v-if="item.showDetails">
            <td colspan="5">
              <OrderComponent :items="item.cartSkis" title="Skis" />
              <OrderComponent :items="item.cartSkiBoots" title="Ski Boots" />
              <OrderComponent :items="item.cartSnowboards" title="Snowboards" />
              <OrderComponent :items="item.cartBoots" title="Boots" />
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </section>
</template>

<script>
import db from "@/data-provider";
import OrderComponent from "@/components/OrderComponent.vue";

export default {
  components: { OrderComponent },
  name: "OrdersView",
  data() {
    return {
      orders: [],
    };
  },
  mounted() {
    db.collection("ORDERS")
      .orderBy("orderDate")
      .onSnapshot((querySnapshot) => {
        this.orders = querySnapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            showDetails: false,
            cartSkis: [],
            cartSkiBoots: [],
            cartSnowboards: [],
            cartBoots: [],
            ...data,
            loading: true,
          };
        });
        
      });
  },
  methods: {
    queryData(queryRef, container) {
      if (!container || (container && !container.lenght)) {
        db.collection(queryRef).onSnapshot((querySnapshot) => {
          querySnapshot.docs.map((doc, index) => {
            const data = doc.data();

            this.$set(container, index, data);
          });
        });
      }
    },
    displayDetails(item) {
      item.showDetails = !item.showDetails;
      const skiRef = item.skis;
      const skiBootsRef = item.skiBoots;
      const snowboardsRef = item.snowboards;
      const bootsRef = item.boots;
      this.queryData(skiRef, item.cartSkis);
      this.queryData(skiBootsRef, item.cartSkiBoots);
      this.queryData(snowboardsRef, item.cartSnowboards);
      this.queryData(bootsRef, item.cartBoots);

      
    },
  },
};
</script>

<style></style>
