import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AllRooms from '@/components/AllRooms.vue'
import ReserveHistory from '@/components/ReserveHistory.vue'
import contactUs from '@/components/contactUs.vue'
import LoginPage from '@/components/LoginPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/AllRooms',
    name: 'AllRooms',
    component: AllRooms
  },
  {
    path: '/ReserveHistory',
    name: 'ReserveHistory',
    component: ReserveHistory
  },
  {
    path: '/contactUs',
    name: 'contactUs',
    component: contactUs
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
