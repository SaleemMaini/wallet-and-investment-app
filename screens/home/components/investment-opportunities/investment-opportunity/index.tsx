import { Card } from '@/components/ui/card'
import { CURRENCY } from '@/constants/currency'
import { InvestmentOpportunity } from '@/types/investment'
import { formatNumber } from '@/utils/format-number'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  opportunity: InvestmentOpportunity
}

export const InvestmentOpportunityCard = (props: Props) => {
  // Props
  const { opportunity } = props

  // Hooks
  const router = useRouter()

  // Vars
  const { name, minimumAmount, expectedAnnualReturn, duration } = opportunity

  return (
    <TouchableOpacity onPress={() => router.push(`/investment-opportunity/${opportunity.id}`)}>
      <Card style={styles.container}>
        <Text style={styles.name}>{name}</Text>

        <View style={styles.content}>
          <Row label='Min amount:' value={`${formatNumber(minimumAmount)} ${CURRENCY}`} />
          <Row label='Expected annual return:' value={`${formatNumber(expectedAnnualReturn)}%`} />
          <Row label='Duration:' value={`${formatNumber(duration)} months`} />
        </View>
      </Card>
    </TouchableOpacity>
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
  container: {
    width: 240,
    gap: 14
  },
  content: {
    gap: 8
  },
  name: {
    fontSize: 16,
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
