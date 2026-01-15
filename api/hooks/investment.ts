import { queryClient } from '@/lib/react-query'
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
    mutationFn: ({ id, payload }: { id: string; payload: { amount: number } }) =>
      ConfiguredAxios.post<AxiosResponse<InvestmentOpportunity>>(END_POINTS.investmentOpportunity(id), payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wallet-balances'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] })
    }
  })

  return mutation
}
