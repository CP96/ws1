<template>
  <div id="nav">
    <a href="#menu" id="menuLink" class="menu-link">
      <!-- Hamburger icon -->
      <span></span>
    </a>

    <div id="menu">
      <div class="pure-menu">
        <router-link class="pure-menu-heading" to="/">Ski SHOP</router-link>

        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <router-link class="pure-menu-link" to="/cart">Cart</router-link>
          </li>
          <li class="pure-menu-item" v-if="userIsAdmin">
            <router-link class="pure-menu-link" to="/admin">Admin</router-link>
          </li>

          <!-- <li class="pure-menu-item menu-item-divided pure-menu-selected">
            <a href="#" class="pure-menu-link">Services</a>
          </li> -->
        </ul>
        <router-link
          tag="button"
          class="pure-button button-secondary"
          to="/login"
          v-if="!userIsLoggedIn"
          >Login</router-link
        >
        <button
          class="button-warning pure-button"
          type="button"
          v-on:click="logout"
          v-else
        >
          Log Out
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import "@/initApp.js";
import db from "@/data-provider";
import firebase from "firebase/app";
import "firebase/auth";
import router from "@/router";

export default {
  data() {
    return {
      userIsLoggedIn: null,
      userIsAdmin: null,
    };
  },

  mounted() {
    document.addEventListener("click", this.handleEvent);

    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.userIsLoggedIn = user;
          db.collection("USERS")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data = doc.data();
                this.userIsAdmin = data.isAdmin;
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
        }
      },
      function(error) {
        console.log(error);
      }
    );
  },

  methods: {
    toggleClass(element, className) {
      var classes = element.className.split(/\s+/);
      var length = classes.length;
      var i = 0;

      for (; i < length; i++) {
        if (classes[i] === className) {
          classes.splice(i, 1);
          break;
        }
      }
      // The className is not found
      if (length === classes.length) {
        classes.push(className);
      }

      element.className = classes.join(" ");
    },

    handleEvent(e) {
      var elements = this.getElements();

      if (e.target.id === elements.menuLink.id) {
        this.toggleAll();
        e.preventDefault();
      } else if (elements.menu.className.indexOf("active") !== -1) {
        this.toggleAll();
      }
    },

    toggleAll() {
      var active = "active";
      var elements = this.getElements();

      this.toggleClass(elements.layout, active);
      this.toggleClass(elements.menu, active);
      this.toggleClass(elements.menuLink, active);
    },

    getElements() {
      return {
        layout: document.getElementById("app"),
        menu: document.getElementById("menu"),
        menuLink: document.getElementById("menuLink"),
      };
    },

    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.userIsLoggedIn = null;
          router.go();
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style>
body {
  color: #777;
}

.pure-img-responsive {
  max-width: 100%;
  height: auto;
}

/*
Add transition to containers so they can push in and out.
*/
#app,
#menu,
.menu-link {
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

/*
This is the parent `<div>` that contains the menu and the content area.
*/
#app {
  position: relative;
  left: 0;
  padding-left: 0;
}
#app.active #menu {
  left: 150px;
  width: 150px;
}

#app.active .menu-link {
  left: 150px;
}
/*
The content `<div>` is where all your content goes.
*/
.content {
  margin: 0 auto;
  padding: 0 2em;
  max-width: 800px;
  margin-bottom: 50px;
  line-height: 1.6em;
}

.header {
  margin: 0;
  color: #333;
  text-align: center;
  padding: 2.5em 2em 0;
  border-bottom: 1px solid #eee;
}
.header h1 {
  margin: 0.2em 0;
  font-size: 3em;
  font-weight: 300;
}
.header h2 {
  font-weight: 300;
  color: #ccc;
  padding: 0;
  margin-top: 0;
}

.content-subhead {
  margin: 50px 0 20px 0;
  font-weight: 300;
  color: #888;
}

/*
The `#menu` `<div>` is the parent `<div>` that contains the `.pure-menu` that
appears on the left side of the page.
*/

#menu {
  margin-left: -150px; /* "#menu" width */
  width: 150px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000; /* so the menu or its navicon stays above all content */
  background: #191818;
  overflow-y: auto;
}
/*
    All anchors inside the menu should be styled like this.
    */
#menu a {
  color: #999;
  border: none;
  padding: 0.6em 0 0.6em 0.6em;
}

/*
    Remove all background/borders, since we are applying them to #menu.
    */
#menu .pure-menu,
#menu .pure-menu ul {
  border: none;
  background: transparent;
}

/*
    Add that light border to separate items into groups.
    */
#menu .pure-menu ul,
#menu .pure-menu .menu-item-divided {
  border-top: 1px solid #333;
}
/*
        Change color of the anchor links on hover/focus.
        */
#menu .pure-menu li a:hover,
#menu .pure-menu li a:focus {
  background: #333;
}

/*
    This styles the selected menu item `<li>`.
    */
#menu .pure-menu-selected,
#menu .pure-menu-heading {
  background: #1f8dd6;
}
/*
        This styles a link within a selected menu item `<li>`.
        */
#menu .pure-menu-selected a {
  color: #fff;
}

/*
    This styles the menu heading.
    */
#menu .pure-menu-heading {
  font-size: 110%;
  color: #fff;
  margin: 0;
}

/* -- Dynamic Button For Responsive Menu -------------------------------------*/

/*
The button to open/close the Menu is custom-made and not part of Pure. Here's
how it works:
*/

/*
`.menu-link` represents the responsive menu toggle that shows/hides on
small screens.
*/
.menu-link {
  position: fixed;
  display: block; /* show this only on small screens */
  top: 0;
  left: 0; /* "#menu width" */
  background: #000;
  background: rgba(0, 0, 0, 0.7);
  font-size: 10px; /* change this value to increase/decrease button size */
  z-index: 10;
  width: 2em;
  height: auto;
  padding: 2.1em 1.6em;
}

.menu-link:hover,
.menu-link:focus {
  background: #000;
}

.menu-link span {
  position: relative;
  display: block;
}

.menu-link span,
.menu-link span:before,
.menu-link span:after {
  background-color: #fff;
  pointer-events: none;
  width: 100%;
  height: 0.2em;
}

.menu-link span:before,
.menu-link span:after {
  position: absolute;
  margin-top: -0.6em;
  content: " ";
}

.menu-link span:after {
  margin-top: 0.6em;
}

/* -- Responsive Styles (Media Queries) ------------------------------------- */

/*
Hides the menu at `48em`, but modify this based on your app's needs.
*/
@media (min-width: 48em) {
  .header,
  .content {
    padding-left: 2em;
    padding-right: 2em;
  }

  #app {
    padding-left: 150px; /* left col width "#menu" */
    left: 0;
  }
  #menu {
    left: 150px;
  }

  .menu-link {
    position: fixed;
    left: 150px;
    display: none;
  }

  #app.active .menu-link {
    left: 150px;
  }
}

@media (max-width: 48em) {
  /* Only apply this when the window is small. Otherwise, the following
    case results in extra padding on the left:
        * Make the window small.
        * Tap the menu to trigger the active state.
        * Make the window large again.
    */
  #app.active {
    position: relative;
    left: 150px;
  }
}
</style>
