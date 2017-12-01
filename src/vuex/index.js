import Vue from 'vue'
import Vuex from 'vuex'
import authAPIService from '../services/examples/authAPIExample.js'

Vue.use(Vuex)

const state = {
  isAuthenticated: false
}

const store = new Vuex.Store({
  modules: {
  },
  state,
  getters: {
    isAuthenticated: (state) => {
      return state.isAuthenticated
    }
  },
  actions: {
    logout (context) {
      context.commit('logout') // commit the mutation (change of state)
    },
    login (context, credentials) {
      return new Promise((resolve) => {
        authAPIService.login(credentials)
          .then((data) => {
            context.commit('login', data) // commit the mutation (change of state)
            resolve()
          })
          .catch(() => window.alert('Could not login!'))
      })
    }
  },
  mutations: {
    logout (state) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', null)
        window.localStorage.setItem('tokenExpiration', null)
      }
      state.isAuthenticated = false
    },
    login (state, token) {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('token', token.token)
        window.localStorage.setItem('tokenExpiration', token.expiration)
      }
      state.isAuthenticated = true
    }
  }
})

// on refresh id user is token not expired the user is authenticated => state isAuthenticated
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function (event) {
    let expiration = window.localStorage.getItem('tokenExpiration')
    let unixTimeStamp = new Date().getTime() / 1000
    if (expiration !== null && parseInt(expiration) - unixTimeStamp > 0) {
      store.state.isAuthenticated = true
    }
  })
}

export default store
