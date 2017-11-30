import axios from 'axios'

var axiosLoginAPIExample = axios.create({
  baseURL: 'https://myAuthURLExample.com'
})

axiosLoginAPIExample.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }

  return config
})

const authAPIServiceExample = {
  login (credentials) {
    return new Promise((resolve, reject) => {
      axiosLoginAPIExample.post('/service/auth.php', credentials)
        .then(response => {
          resolve(response.data)
        }).catch(response => {
          reject(response.status)
        })
    })
  }
}

export default authAPIServiceExample
