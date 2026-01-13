export const END_POINTS = {
  // Wallet
  balances: '/wallet/balances',
  transactions: '/wallet/transactions',

  // Investment
  investmentOpportunities: '/investment/opportunities',
  investmentOpportunity: (id: string) => `/investment/opportunities/${id}`
}
