export type WalletBalancesResponse = {
  available: number
  invested: number
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  INVEST = 'invest'
}

export type Transaction = {
  id: string
  type: TransactionType
  date: string
  amount: number
}

export type TransactionsResponse = {
  transactions: Transaction[]
}
