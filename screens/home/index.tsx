import { BalanceSummary } from '@/components/balance-summary'
import { View } from 'react-native'
import { InvestmentOpportunitiesList } from './investment-opportunities'

export const HomeScreen = () => {
  return (
    <View style={{ padding: 16, flex: 1, gap: 16 }}>
      <BalanceSummary />
      <InvestmentOpportunitiesList />
    </View>
  )
}
