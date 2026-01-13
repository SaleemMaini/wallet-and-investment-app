import { BalanceSummary } from '@/components/balance-summary'
import { View } from 'react-native'
import { TransactionsList } from './components/transactions-list'

export const WalletScreen = () => {
  return (
    <View style={{ padding: 16, flex: 1, gap: 16 }}>
      <BalanceSummary />
      <TransactionsList />
    </View>
  )
}
