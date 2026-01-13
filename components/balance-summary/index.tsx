import { useWalletBalancesQuery } from '@/api/hooks/wallet'
import { CURRENCY } from '@/constants/currency'
import { formatNumber } from '@/utils/format-number'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { calcTotalBalance } from './utils'

export const BalanceSummary = () => {
  const { data, error, isLoading } = useWalletBalancesQuery()

  const balances = data?.data.data

  if (error) {
    return (
      <View style={styles.stateContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name="alert-circle" size={24} color="#EF4444" />
        </View>
        <Text style={styles.errorText}>Failed to load balances</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
      </View>
    )
  }

  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size="small" color="#6366F1" />
        <Text style={styles.loadingText}>Loading balances...</Text>
      </View>
    )
  }

  if (!balances) {
    return (
      <View style={styles.stateContainer}>
        <Ionicons name="wallet-outline" size={24} color="#9CA3AF" />
        <Text style={styles.emptyText}>No balances found</Text>
      </View>
    )
  }

  const { available, invested } = balances
  const totalBalance = calcTotalBalance(available, invested)

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Ionicons name="wallet" size={18} color="#6366F1" />
        </View>
        <Text style={styles.title}>Balance Summary</Text>
      </View>

      {/* Main Card */}
      <View style={styles.card}>
        {/* Total Balance - Hero Section */}
        <View style={styles.totalSection}>
          <Text style={styles.totalLabel}>Total Balance</Text>
          <Text style={styles.totalAmount}>
            {formatNumber(totalBalance)} <Text style={styles.currency}>{CURRENCY}</Text>
          </Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Balance Breakdown */}
        <View style={styles.breakdown}>
          <BalanceRow
            icon="checkmark-circle"
            iconColor="#10B981"
            iconBg="rgba(16, 185, 129, 0.1)"
            label="Available"
            value={available}
          />
          <BalanceRow
            icon="trending-up"
            iconColor="#6366F1"
            iconBg="rgba(99, 102, 241, 0.1)"
            label="Invested"
            value={invested}
          />
        </View>
      </View>
    </View>
  )
}

type BalanceRowProps = {
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  iconBg: string
  label: string
  value: number
}

const BalanceRow = ({ icon, iconColor, iconBg, label, value }: BalanceRowProps) => {
  return (
    <View style={styles.row}>
      <View style={styles.rowLeft}>
        <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>
          <Ionicons name={icon} size={16} color={iconColor} />
        </View>
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={styles.rowValue}>
        {formatNumber(value)} {CURRENCY}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.3,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    gap: 18,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
  totalSection: {
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
  },
  totalLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: -1,
  },
  currency: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: -4,
  },
  breakdown: {
    gap: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  // State containers
  stateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    minHeight: 140,
  },
  errorIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
  },
  errorSubtext: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  loadingText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontWeight: '500',
  },
})
