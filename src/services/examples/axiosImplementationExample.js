import axios from 'axios'

var myAPI = axios.create({
  baseURL: 'https://myapi.com'
})

const myAPIService = {
  getAData (dataId) {
    return new Promise((resolve, reject) => {
      myAPI.get('apiMethodUrl')
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default myAPIService
