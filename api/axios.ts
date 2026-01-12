import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { isAxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Toast from 'react-native-toast-message'

const api = axios.create({
  baseURL: 'https://api.example.com'
})

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  if (!config.headers) {
    return config
  }

  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json'
  }

  config.headers.Accept = 'application/json'

  return config
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}

const onResponseError = (error: AxiosError | any): Promise<AxiosError> => {
  if (!error.response?.data) {
    return Promise.reject(error)
  }

  if (isAxiosError(error)) {
    const message = error.response.data.message
    const errorsMessages = error.response.data.errors ? Object.values(error.response.data.errors) : []

    Toast.hide()
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        errorsMessages.length > 1
          ? errorsMessages.join(',')
          : __DEV__
            ? `${message} \n url: ${error.config?.url}` || `error fetching ${error.config?.url || 'unknown route'}`
            : message
    })
  }

  return Promise.reject(error)
}

api.interceptors.request.use(onRequest)
api.interceptors.response.use(onResponse, onResponseError)

const mock = new MockAdapter(api, { delayResponse: 500 })

export { api, mock }
