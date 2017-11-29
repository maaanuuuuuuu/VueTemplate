import googleActuAPIService from '../services/googleActuAPI.js'
const state = {
  posts: [],
  postId: ''
}

const getters = {
  posts: state => state.posts
}

const actions = {
  updateColumn (context, postId) {
    console.log('action updateColumn')
    googleActuAPIService.getPosts(postId).then(data => {
      context.commit('updateColumn', {postId: postId, posts: data.articles})
    })
  }
}

const mutations = {
  updateColumn (state, column) {
    console.log('mutation updateColumn')
    state.postId = column.postId
    state.posts = column.posts
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
