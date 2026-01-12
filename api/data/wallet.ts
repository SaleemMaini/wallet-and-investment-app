import { Transaction, WalletBalancesResponse } from '@/types/wallet'

export const balances: WalletBalancesResponse = {
  available: 1234.23,
  invested: 5000.00
}

export const transactions: Transaction[] = [
  {
    id: 1,
    name: 'Transaction 1',
    amount: 100
  }
]
