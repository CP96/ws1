<template>
  <div class="cart">
    <h1>Cart</h1>
    <section class="content">
      <p>Total Cart : {{ this.cartTotalPrice }}</p>
      <h2>Skis</h2>
      <Items
        v-if="skisCart"
        :collection="skisCart"
        adminCollection="SKIS"
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
        adminCollection="SNOWBOARDS"
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
        adminCollection="SKIBOOTS"
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
        adminCollection="BOOTS"
        orderBy="createdAt"
        :headers="['model', 'size', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
        v-on:totalPrice="bootsTotalPrice = $event"
      />
      <p>Total Cart : {{ this.cartTotalPrice }}</p>
      <button
        class="button-success pure-button"
        type="button"
        v-on:click="onOrder"
      >
        Order
      </button>
    </section>
  </div>
</template>

<script>
import "@/initApp.js";
import Items from "@/components/Items.vue";
import firebase from "firebase/app";
import db from "@/data-provider";
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
      user: null,
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
          this.user = user;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },

  methods: {
    onOrder() {
      console.log(this.user);
      const order = {
        skis: this.skisCart,
        snowboards: this.snowboardsCart,
        skiBoots: this.skiBootsCart,
        boots: this.bootsCart,
        orderDate:firebase.firestore.FieldValue.serverTimestamp(),
      };
      const uid = this.user.uid;
      db.collection("ORDERS")
        .doc(uid)
        .set(order)
        .then(() => {
          console.log("Order Saved");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
