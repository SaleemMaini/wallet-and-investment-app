import { Transaction, TransactionType, WalletBalancesResponse } from '@/types/wallet'

export const balances: WalletBalancesResponse = {
  available: 1234.23,
  invested: 5000.0
}

export const transactions: Transaction[] = [
  {
    id: '1',
    amount: 100,
    date: '2021-01-01T00:00:00.000Z',
    type: TransactionType.DEPOSIT
  },
  {
    id: '2',
    amount: 200,
    date: '2021-01-02T00:00:00.000Z',
    type: TransactionType.INVEST
  },
  {
    id: '3',
    amount: 300,
    date: '2021-01-03T00:00:00.000Z',
    type: TransactionType.DEPOSIT
  },
  {
    id: '4',
    amount: 400,
    date: '2021-01-04T00:00:00.000Z',
    type: TransactionType.INVEST
  }
]
