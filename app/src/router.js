import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import { USER_CHECK } from '@/store/modules/users/types'
import Home from '@/views/Home.vue'
import Layout from '@/views/Layout.vue'
import Project from '@/views/Project.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'Home', component: Home },
        {
          path: 'project',
          name: 'Project',
          component: Project,
          meta: { requiredAuth: true },
        },
      ],
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import(/* webpackChunkName: "Auth" */'./views/Signin.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import(/* webpackChunkName: "Auth" */'./views/Signup.vue'),
      meta: { guestOnly: true },
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

router.beforeEach(async (to, from, next) => {
  await store.dispatch(`users/${USER_CHECK}`).catch(() => {
    if (to.matched.some(record => record.meta.requiredAuth)) {
      return next({
        path: '/sigin',
        query: { redirect: to.fullPath },
      })
    }
    return next()
  })
  if (to.matched.some(record => record.meta.guestOnly)) {
    return next({ path: '/project' })
  }
  return next()
})

export default router
