import { WalletBalancesResponse } from '@/types/wallet'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { ConfiguredAxios } from '../axios'
import { END_POINTS } from '../endpoints'

export const useWalletBalancesQuery = () => {
  const query = useQuery({
    queryKey: ['wallet-balances'],
    queryFn: () => ConfiguredAxios.get<AxiosResponse<WalletBalancesResponse>>(END_POINTS.balances)
  })

  return query
}
