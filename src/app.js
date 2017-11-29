import Vue from 'vue' // import vue module
import AppLayout from './theme/layout.vue'
import router from './router'
import store from './vuex/index.js'

// declare app as the main vue object
const app = new Vue({
  router,
  ...AppLayout, // ... is the spread operator in ES6: the properties of the AppLayout spread inside the Vue constructor parameter
  store // all the states
})

export { app, router, store }
