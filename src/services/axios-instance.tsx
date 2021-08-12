import axios from 'axios'
import { interceptorInfos } from './axios-interceptors'

export const axiosInstance = axios.create()

let intercept = false

axiosInstance.interceptors.request.use((config: any) => {
  if (intercept === true) {
    for (let interceptorInfo of interceptorInfos) {
      if (config.url.includes(interceptorInfo.pathMatch)) {
        config.adapter = interceptorInfo.responseFunction
        break
      }
    }
  }

  return {
    ...config,
    headers: {
      ...config.headers,
    },
  }
})
