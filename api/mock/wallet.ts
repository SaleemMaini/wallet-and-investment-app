import { mock } from '../axios'
import { END_POINTS } from '../endpoints'

mock.onGet(END_POINTS.balances).reply(200, {
  data: {
    balances: [
      {
        id: 1,
        name: 'Balance 1',
        amount: 100
      }
    ]
  }
})

mock.onGet(END_POINTS.transactions).reply(200, {
  data: {
    transactions: [
      {
        id: 1,
        name: 'Transaction 1',
        amount: 100
      }
    ]
  }
})
