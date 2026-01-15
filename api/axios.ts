import { TransactionType } from '@/types/wallet'
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios, { isAxiosError } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import Toast from 'react-native-toast-message'
import { investmentOpportunities } from './data/investment'
import { balances, transactions } from './data/wallet'
import { END_POINTS } from './endpoints'

axios.defaults.baseURL = 'http://localhost:3000'

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

    if (message) {
      error.message = message
    }

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

axios.interceptors.request.use(onRequest)
axios.interceptors.response.use(onResponse, onResponseError)

// Mock API
const mock = new MockAdapter(axios, { delayResponse: 500 })

mock.onGet(END_POINTS.balances).reply(200, {
  data: balances
})

mock.onGet(END_POINTS.transactions).reply(200, {
  data: {
    transactions
  }
})

mock.onGet(END_POINTS.investmentOpportunities).reply(200, {
  data: investmentOpportunities
})

mock.onGet(/\/investment\/opportunities\/\d+/).reply(config => {
  const id = config.url?.split('/').pop()
  const opportunity = investmentOpportunities.find(o => o.id === id)
  if (opportunity) {
    return [200, { data: opportunity }]
  }
  return [404, { message: 'Investment opportunity not found' }]
})

mock.onPost(/\/investment\/opportunities\/\d+/).reply(config => {
  const { amount } = JSON.parse(config.data || '{}')

  if (amount > balances.available) {
    return [400, { message: 'Insufficient balance' }]
  }

  balances.available -= amount
  balances.invested += amount
  transactions.unshift({
    id: String(transactions.length + 1),
    amount,
    date: new Date().toISOString(),
    type: TransactionType.INVEST
  })

  return [
    200,
    {
      data: {
        message: 'Investment opportunity invested successfully'
      }
    }
  ]
})

export { axios as ConfiguredAxios, mock }
