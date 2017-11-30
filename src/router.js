import Vue from 'vue'
import VueRouter from 'vue-router'
import Columns from './theme/columns.vue'
import Login from './theme/login.vue'
import NotFound from './theme/notFound.vue'
// FOR LAZY LOADING
// const Columns = () => System.import('./theme/Columns.vue')
// const Login = () => System.import('./theme/login.vue')
// const NotFound = () => System.import('./theme/notFound.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  scrollBehavior: (to, from, savedPosition) => ({ y: savedPosition }),
  routes: [
    // { path: '/', redirect: '/section/all' },
    { path: '/login', component: Login },
    { path: '/section/:id', name: 'routeExample', component: Columns },
    { path: '*', component: NotFound }
  ]
})

export default router
