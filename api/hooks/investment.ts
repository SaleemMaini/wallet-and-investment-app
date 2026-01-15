import { InvestmentOpportunity } from '@/types/investment'
import { useMutation, useQuery } from '@tanstack/react-query'
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

export const useInvestmentOpportunityQuery = (id: string) => {
  const query = useQuery({
    queryKey: ['investment-opportunity', id],
    queryFn: () => ConfiguredAxios.get<AxiosResponse<InvestmentOpportunity>>(END_POINTS.investmentOpportunity(id))
  })

  return query
}

export const useInvestOpportunityMutation = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      ConfiguredAxios.post<AxiosResponse<InvestmentOpportunity>>(END_POINTS.investmentOpportunity(id))
  })

  return mutation
}
