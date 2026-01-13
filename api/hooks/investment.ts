import { InvestmentOpportunity } from '@/types/investment'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ConfiguredAxios } from '../axios'
import { END_POINTS } from '../endpoints'

export const useInvestmentOpportunitiesQuery = () => {
  const query = useQuery({
    queryKey: ['investment-opportunities'],
    queryFn: () => ConfiguredAxios.get<AxiosResponse<InvestmentOpportunity[]>>(END_POINTS.investmentOpportunities)
  })

  return query
}
