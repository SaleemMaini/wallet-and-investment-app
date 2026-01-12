import { useWalletBalancesQuery } from '@/api/hooks/wallet'
import { CURRENCY } from '@/constants/currency'
import { formatNumber } from '@/utils/format-number'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { calcTotalBalance } from './utils'

export const BalanceSummary = () => {
  const { data, error, isLoading } = useWalletBalancesQuery()

  const balances = data?.data.data

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  if (!balances) {
    return (
      <View>
        <Text>No balances found</Text>
      </View>
    )
  }

  const { available, invested } = balances

  const totalBalance = calcTotalBalance(available, invested)

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Balance Summary</Text>

      <View style={styles.card}>
        {/* Available Balance */}
        <Text>
          Available: {formatNumber(available)} {CURRENCY}
        </Text>

        {/* Invested Balance */}
        <Text>
          Invested: {formatNumber(invested)} {CURRENCY}
        </Text>

        {/* Total Balance */}
        <Text style={styles.totalBalance}>
          Total: {formatNumber(totalBalance)} {CURRENCY}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000'
  },
  container: {
    gap: 10
  },
  card: {
    padding: 16,
    backgroundColor: '#e0dfdf',
    borderRadius: 16,
    gap: 10
  },
  totalBalance: {
    fontWeight: 'bold',
    color: '#000000'
  }
})
