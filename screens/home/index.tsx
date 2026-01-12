import { BalanceSummary } from '@/components/balance-summary'
import { SafeAreaView } from 'react-native-safe-area-context'

export const HomeScreen = () => {
  return (
    <SafeAreaView style={{ padding: 16 }}>
      <BalanceSummary />
    </SafeAreaView>
  )
}
