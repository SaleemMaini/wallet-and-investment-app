import { useTransactionsQuery } from '@/api/hooks/wallet'
import { FlashList } from '@shopify/flash-list'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { TransactionItem } from './transaction-item'

export const TransactionsList = () => {
  const { data, isLoading } = useTransactionsQuery()

  const transactions = data?.data.data.transactions || []

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>Transactions</Text>

      <FlashList
        data={transactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          isLoading ? <ActivityIndicator size='large' color='#000000' /> : <Text>No transactions found</Text>
        }
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
    height: 10
  }
})
