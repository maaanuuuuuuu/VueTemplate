import Vue from 'vue'
import VueRouter from 'vue-router'
// import Columns from './theme/layout/columns.vue'
import Login from './theme/components/login.vue'
import NotFound from './theme/components/notFound.vue'
import DemoComponents from './theme/components/demoComponents.vue'
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
    { path: '/', redirect: '/home' },
    // { path: '/section/:id', name: 'routeExample', component: Columns },
    { path: '/login', component: Login },
    { path: '/home' },
    { path: '/components', component: DemoComponents },
    { path: '/layouts' },
    { path: '/notfound', component: NotFound },
    { path: '*', component: NotFound }
  ]
})

export default router
