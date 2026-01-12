export type WalletBalancesResponse = {
  available: number
  invested: number
}

export type Transaction = {
  id: number
  name: string
  amount: number
}

export type TransactionsResponse = {
  transactions: Transaction[]
}