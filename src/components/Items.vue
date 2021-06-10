<template>
  <div>
    <table class="pure-table pure-table-horizontal">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col" v-for="header in headers" :key="header">
            {{ header.toUpperCase() }}
          </th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td v-for="columnName in headers" :key="columnName">
            {{ item[columnName] || "NA" }}
          </td>
          <td>
            <button
              v-if="enableEdit"
              class="button-warning pure-button"
              type="button"
              v-on:click="onEdit(item)"
            >
              Edit
            </button>
            <button
              v-if="enableDelete"
              class="button-error pure-button"
              type="button"
              v-on:click="onDelete(item)"
            >
              DELETE
            </button>
            <button
              v-if="!enableEdit && showReserveBtn"
              class="pure-button"
              :class="{
                'pure-button-disabled': !userIsLoggedIn || !item.count,
                'button-secondary': userIsLoggedIn,
              }"
              type="button"
              v-on:click="onReserve(item)"
            >
              RESERVE
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from "@/data-provider";
import firebase from "firebase/app";

export default {
  name: "Items",
  props: {
    collection: String,
    headers: Array,
    enableEdit: Boolean,
    orderBy: String,
    showReserveBtn: Boolean,
    enableDelete: Boolean,
    adminCollection: String,
  },

  data() {
    return { items: [], totalPrice: 0 };
  },

  computed: {
    userIsLoggedIn: function() {
      const user = firebase.auth().currentUser;

      return user ? true : false;
    },

    user: function() {
      const user = firebase.auth().currentUser;

      return user ? user : null;
    },
  },

  mounted() {
    db.collection(this.collection)
      .orderBy(this.orderBy)
      .onSnapshot((querySnapshot) => {
        this.items = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          this.totalPrice += data.count * data.price;
          return { id: doc.id, ...data };
        });
        this.$emit("totalPrice", this.totalPrice);
      });
  },

  methods: {
    onDelete({ id , count}) {
      db.collection(this.collection)
        .doc(id)
        .delete()
        .then(() => {
          if (this.adminCollection) {
            console.log(count);
            console.log(this.adminCollection);
            console.log(id);
            const increment = firebase.firestore.FieldValue.increment(parseInt(count));
            db.collection(this.adminCollection)
              .doc(id)
              .update({ count: increment })
              .then(() => console.log("Item incremented"))
              .catch(() => console.log("Item not incremented !"));
          }
          console.log("Document successfully deleted!");
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
    },

    onEdit(item) {
      this.$emit("edit", item);
    },

    onReserve(item) {
      const uid = this.user.uid;
      const id = item.id;
      const increment = firebase.firestore.FieldValue.increment(-1);

      db.collection(this.collection)
        .doc(id)
        .update({ count: increment })
        .then(() => {
          console.log("Item successfully reserved!");
        })
        .catch((error) => {
          console.error("Error updating item: ", error);
        });

      const docRef = db
        .collection("CART")
        .doc(uid)
        .collection(this.collection)
        .doc(item?.id);

      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const increment = firebase.firestore.FieldValue.increment(1);
            docRef.update({ count: increment });
            console.log("Document data:", doc.data());
          } else {
            item.count = 1;
            docRef
              .set({ ...item })
              .then(() => {
                console.log("Document written");
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });

      // db.collection("CART")
      //   .doc(uid)
      //   .collection(this.collection)
      //   .doc(item?.id)
      //   .set({ ...item })
      //   .then(() => {
      //     console.log("Document written");
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });
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
