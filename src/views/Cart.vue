<template>
  <div class="cart">
    <h1>Cart</h1>
    <section class="content">
      <h2>Skis</h2>
      <Items
        v-if="skisCart"
        :collection="skisCart"
        orderBy="createdAt"
        :headers="['model', 'lenght', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
      />
      <h2>Snowboards</h2>
      <Items
        v-if="snowboardsCart"
        :collection="snowboardsCart"
        orderBy="createdAt"
        :headers="['model', 'lenght', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
      />
      <h2>SkiBoots</h2>
      <Items
        v-if="skiBootsCart"
        :collection="skiBootsCart"
        orderBy="createdAt"
        :headers="['model', 'size', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
      />
      <h2>Boots</h2>
      <Items
        v-if="bootsCart"
        :collection="bootsCart"
        orderBy="createdAt"
        :headers="['model', 'size', 'price', 'count']"
        :showReserveBtn="false"
        :enableDelete="true"
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

  data() {
    return {
      skisCart: null,
      snowboardsCart: null,
      skiBootsCart: null,
      bootsCart: null,
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

  methods: {},
};
</script>

<style></style>
