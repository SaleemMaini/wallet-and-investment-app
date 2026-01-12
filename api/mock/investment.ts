import { mock } from '../axios'
import { END_POINTS } from '../endpoints'

mock.onGet(END_POINTS.investmentOpportunities).reply(200, {
  data: {
    opportunities: [
      {
        id: 1,
        name: 'Investment Opportunity 1',
        amount: 100
      }
    ]
  }
})
