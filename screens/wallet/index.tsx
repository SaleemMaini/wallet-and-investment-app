import { BalanceSummary } from '@/components/balance-summary'
import { View } from 'react-native'

export const WalletScreen = () => {
  return (
    <View style={{ padding: 16, flex: 1, gap: 16 }}>
      <BalanceSummary />
    </View>
  )
}
