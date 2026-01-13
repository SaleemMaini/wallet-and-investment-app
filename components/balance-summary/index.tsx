import { useWalletBalancesQuery } from '@/api/hooks/wallet'
import { CURRENCY } from '@/constants/currency'
import { formatNumber } from '@/utils/format-number'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from '../ui/card'
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

      <Card>
        {/* Available Balance */}
        <Row label='Available:' value={`${formatNumber(available)} ${CURRENCY}`} />

        {/* Invested Balance */}
        <Row label='Invested:' value={`${formatNumber(invested)} ${CURRENCY}`} />

        {/* Total Balance */}
        <Row label='Total:' value={`${formatNumber(totalBalance)} ${CURRENCY}`} />
      </Card>
    </View>
  )
}

const Row = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.row}>
      <Text>{label}</Text>
      <Text style={styles.value}>{value}</Text>
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
  totalBalance: {
    fontWeight: 'bold',
    color: '#000000'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  value: {
    fontWeight: 'bold',
    color: '#000000'
  }
})
