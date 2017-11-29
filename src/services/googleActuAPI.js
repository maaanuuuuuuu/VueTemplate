import axios from 'axios'

var axiosGoogleActuAPI = axios.create({
  baseURL: 'https://newsapi.org'
})

const googleActuAPI = {
  getPosts (postId) {
    return new Promise((resolve, reject) => {
      axiosGoogleActuAPI.get(`/v2/everything?q=${postId}&sortBy=publishedAt&apiKey=542fe59c1b674c66ad7edcb335b27ce5`)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default googleActuAPI
