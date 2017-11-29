import axios from 'axios'

var axiosTrainingAPI = axios.create({
  baseURL: 'https://api.fullstackweekly.com'
})

axiosTrainingAPI.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

const trainingAPI = {
  login (credentials) {
    return new Promise((resolve, reject) => {
      axiosTrainingAPI.post('/services/auth.php', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  },
  getProfile () {
    return new Promise((resolve) => {
      axiosTrainingAPI.get('/services/profile.php')
        .then(response => {
          resolve(response.data)
        })
    })
  }
}

export default trainingAPI
