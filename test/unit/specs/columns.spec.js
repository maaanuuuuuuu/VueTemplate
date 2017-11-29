import 'es6-promise/auto'
import Vue from 'vue'
import store from '../../../src/vuex/index.js'
import VueRouter from 'vue-router'
import Columns from '../../../src/theme/columns.vue'

describe('columns.vue', () => {
  it('should load front-end links', done => {
    Vue.use(VueRouter)
    const router = new VueRouter({
      routes: [
        { path: 'news/all', component: Columns }
      ]
    })

    const vm = new Vue({
      el: document.createElement('div'),
      router,
      store,
      render: h => h('router-view')
    })

    store.watch(
      (state) => {
        return state.postModule.posts
      },
      function () {
        console.log('HELLO')
        expect(vm.$el.querySelectorAll('.column').length).to.equal(20)
        done()
      }
    )
  })
})
