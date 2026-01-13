import { CURRENCY } from '@/constants/currency'
import { InvestmentOpportunity } from '@/types/investment'
import { formatNumber } from '@/utils/format-number'
import { Ionicons } from '@expo/vector-icons'
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
    <TouchableOpacity onPress={() => router.push(`/investment-opportunity/${opportunity.id}`)} activeOpacity={0.7}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name='analytics' size={20} color='#6366F1' />
          </View>
          <Text style={styles.name} numberOfLines={1}>
            {name}
          </Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Min. Amount</Text>
            <Text style={styles.statValue}>
              {formatNumber(minimumAmount)} {CURRENCY}
            </Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Annual Return</Text>
            <Text style={[styles.statValue, styles.returnValue]}>+{formatNumber(expectedAnnualReturn)}%</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{formatNumber(duration)} mo</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>View Details</Text>
          <Ionicons name='chevron-forward' size={14} color='#6366F1' />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: 220,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    gap: 16,
    // Shadow
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    // Subtle border
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.08)'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.3
  },
  statsGrid: {
    gap: 12
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '400'
  },
  statValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151'
  },
  returnValue: {
    color: '#10B981'
  },
  ctaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
    borderRadius: 10,
    marginTop: 2
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6366F1'
  }
})
