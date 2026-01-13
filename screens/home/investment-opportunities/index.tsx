import { useInvestmentOpportunitiesQuery } from '@/api/hooks/investment'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { InvestmentOpportunityCard } from './investment-opportunity'
export const InvestmentOpportunitiesList = () => {
  // Hooks
  const { data, isLoading } = useInvestmentOpportunitiesQuery()

  // Vars
  const investmentOpportunities = data?.data.data || []

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Investment Opportunities</Text>

      <FlashList
        data={investmentOpportunities}
        renderItem={({ item }) => <InvestmentOpportunityCard opportunity={item} />}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size='large' color='#000000' />
          ) : (
            <Text>No investment opportunities found</Text>
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ height: 200 }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10
  },
  separator: {
    width: 10
  }
})
