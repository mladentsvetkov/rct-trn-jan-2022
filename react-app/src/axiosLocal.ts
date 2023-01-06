import axios from 'axios'
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const BASE_URL = 'https://api.chucknorris.io/jokes'

const axiosInstanceLocal: any = axios.create({
  baseURL: BASE_URL,
})

axiosInstanceLocal.interceptors.request.use(
  // async
  async (config: any) => {
    const token = true
    // const token = await getToken()
    if (token) {
      console.log('I am authenticating')
      // config.headers['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  (error: any) => {
    Promise.reject(error)
  }
)

// add delay:
// axiosInstanceLocal.interceptors.request.use(async (config: any) => {
//   console.log('I am delaying')
//   return new Promise((resolve) => setTimeout(() => resolve(config), 2500))
// })

// force error
// axiosInstanceLocal.interceptors.request.use(() => {
//   Promise.reject('Forced error')
// })

// axiosInstanceLocal.interceptors.response.use(
//   (response: any) => response,
//   async (error: any) => {
//     if (error.response.status === 401) {
//       console.log('Unauthenticated')
//     }
//     if (error.response.status === 404) {
//       history.replace('/not-found')
//     }
//     return Promise.reject(error)
//   }
// )

export default axiosInstanceLocal
