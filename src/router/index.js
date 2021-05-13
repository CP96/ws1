import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/auth/Auth.vue'
import AdminPage from '@/views/admin-page/AdminPage.vue'
import SkisView from '@/views/admin-page/SkisView.vue'
import SnowboardsView from '@/views/admin-page/SnowboardsView.vue'
import SkiBootsView from '@/views/admin-page/SkiBootsView.vue'
import BootsView from '@/views/admin-page/BootsView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPage,
    children:[
      {
        path:'snowboards',
        name:'Snowboards',
        component: SnowboardsView
      },
      {
        path:'skis',
        name:'Skis',
        component: SkisView
      },
      {
        path:'skiboots',
        name:'SkiBoots',
        component: SkiBootsView
      },
      {
        path:'boots',
        name:'Boots',
        component: BootsView
      }
    ],
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: 'pure-menu-selected',
})

export default router
