import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'Home', component: Home },
      ],
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "Auth" */'./views/Signup.vue'),
    },
    {
      path: '/ar-sample',
      name: 'ArSample',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Ar" */ './views/ArSample.vue'),
    },
    {
      path: '/vr',
      name: 'Vr',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "Vr" */ './views/Vr.vue'),
    },
  ],
})
