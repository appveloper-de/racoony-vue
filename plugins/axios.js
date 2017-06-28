import axios from 'axios'
import store from '~store'

let instance = axios.create({
  baseURL: 'http://racoo.ny/api/'
})

instance.interceptors.request.use((config) => {
  if (store.state.auth.access_token) {
    config.headers.common['Authorization'] = `Bearer ${store.state.auth.access_token}`
  }
  return config
}, (error) => Promise.reject(error))

export default instance
