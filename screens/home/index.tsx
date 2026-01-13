import { BalanceSummary } from '@/components/balance-summary'
import { SafeAreaView } from 'react-native-safe-area-context'
import { InvestmentOpportunitiesList } from './investment-opportunities'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ padding: 16, flex: 1, gap: 16 }}>
      <BalanceSummary />
      <InvestmentOpportunitiesList />
    </SafeAreaView>
  )
}
