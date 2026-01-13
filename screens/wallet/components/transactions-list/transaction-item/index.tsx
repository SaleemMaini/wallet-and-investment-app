import { CURRENCY } from '@/constants/currency'
import { formatDateToShortString } from '@/lib/date-fns'
import { Transaction, TransactionType } from '@/types/wallet'
import { formatNumber } from '@/utils/format-number'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  transaction: Transaction
}

const TRANSACTION_CONFIG = {
  [TransactionType.DEPOSIT]: {
    icon: 'arrow-down-circle' as const,
    label: 'Deposit',
    color: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    prefix: '+',
  },
  [TransactionType.INVEST]: {
    icon: 'trending-up' as const,
    label: 'Investment',
    color: '#6366F1',
    backgroundColor: 'rgba(99, 102, 241, 0.12)',
    prefix: '-',
  },
}

export const TransactionItem = (props: Props) => {
  // Props
  const { transaction } = props

  // Vars
  const { type, date, amount } = transaction
  const config = TRANSACTION_CONFIG[type]

  return (
    <View style={styles.container}>
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: config.backgroundColor }]}>
        <Ionicons name={config.icon} size={22} color={config.color} />
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.typeLabel}>{config.label}</Text>
        <Text style={styles.date}>{formatDateToShortString(date)}</Text>
      </View>

      {/* Amount */}
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: config.color }]}>
          {config.prefix}
          {formatNumber(amount)} {CURRENCY}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    gap: 14,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    gap: 3,
  },
  typeLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F2937',
    letterSpacing: -0.2,
  },
  date: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '400',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
})
