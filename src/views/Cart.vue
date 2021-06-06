<template>
  <div class="cart">
    <h1>Cart</h1>
    <section class="content">
     <h3>TOtal CArt : {{ this.cartTotalPrice }}</h3> 
      <h2>Skis</h2>
      <Items
        v-if="skisCart"
        :collection="skisCart"
        orderBy="createdAt"
        :headers="['model', 'lenght', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
        v-on:totalPrice="skiTotalPrice = $event"
      />
      <h2>Snowboards</h2>
      <Items
        v-if="snowboardsCart"
        :collection="snowboardsCart"
        orderBy="createdAt"
        :headers="['model', 'lenght', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
        v-on:totalPrice="snowboardsTotalPrice = $event"
      />
      <h2>SkiBoots</h2>
      <Items
        v-if="skiBootsCart"
        :collection="skiBootsCart"
        orderBy="createdAt"
        :headers="['model', 'size', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
        v-on:totalPrice="skibootsTotalPrice = $event"
      />
      <h2>Boots</h2>
      <Items
        v-if="bootsCart"
        :collection="bootsCart"
        orderBy="createdAt"
        :headers="['model', 'size', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
        v-on:totalPrice="bootsTotalPrice = $event"
      />
    </section>
  </div>
</template>

<script>
import "@/initApp.js";
import Items from "@/components/Items.vue";
import firebase from "firebase/app";
export default {
  name: "Cart",
  components: {
    Items,
  },

  computed: {
    cartTotalPrice() {
      return (
        this.skiTotalPrice +
        this.snowboardsTotalPrice +
        this.bootsTotalPrice +
        this.skibootsTotalPrice
      );
    },
  },

  data() {
    return {
      skisCart: null,
      snowboardsCart: null,
      skiBootsCart: null,
      bootsCart: null,
      skiTotalPrice: 0,
      snowboardsTotalPrice: 0,
      bootsTotalPrice: 0,
      skibootsTotalPrice: 0,
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.skisCart = "CART/" + user.uid + "/SKIS";
          this.snowboardsCart = "CART/" + user.uid + "/SNOWBOARDS";
          this.skiBootsCart = "CART/" + user.uid + "/SKIBOOTS";
          this.bootsCart = "CART/" + user.uid + "/BOOTS";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },

  methods: {
    // getTotalPrice(price, container) {
    //   console.log(price);
    //   container = price;
    // },
  },
};
</script>

<style></style>
