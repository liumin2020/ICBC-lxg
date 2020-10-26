import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Warning from '../views/Warning.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/',
    name:'Home',
    component:Home
  },
  {
    path:'/warning',
    name:'Warning',
    // components:Warning
    component: () => import(/* webpackChunkName: "Warning" */ '../views/Warning.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: '',
  base: process.env.BASE_URL,
  routes
})

export default router
