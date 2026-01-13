import { useInvestmentOpportunityQuery } from '@/api/hooks/investment'
import { useWalletBalancesQuery } from '@/api/hooks/wallet'
import { CURRENCY } from '@/constants/currency'
import { formatNumber } from '@/utils/format-number'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles'

export const InvestmentOpportunityDetailsScreen = () => {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()
  const { data, isLoading, error } = useInvestmentOpportunityQuery(id)
  const { data: balancesData } = useWalletBalancesQuery()
  const opportunity = data?.data.data
  const availableBalance = balancesData?.data.data.available ?? 0
  const hasInsufficientBalance = opportunity ? availableBalance < opportunity.minimumAmount : false

  // Loading state
  if (isLoading) {
    return (
      <View style={styles.stateContainer}>
        <ActivityIndicator size='large' color='#6366F1' />
        <Text style={styles.loadingText}>Loading opportunity...</Text>
      </View>
    )
  }

  // Error state
  if (error) {
    return (
      <View style={styles.stateContainer}>
        <View style={styles.errorIcon}>
          <Ionicons name='alert-circle' size={32} color='#EF4444' />
        </View>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorSubtext}>{error.message}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  // No data state
  if (!opportunity) {
    return (
      <View style={styles.stateContainer}>
        <Ionicons name='search' size={32} color='#9CA3AF' />
        <Text style={styles.errorTitle}>Opportunity not found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
          <Text style={styles.retryText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const { name, description, expectedAnnualReturn, duration, minimumAmount } = opportunity

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + (hasInsufficientBalance ? 180 : 120) }
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <Ionicons name='analytics' size={28} color='#6366F1' />
          </View>
          <Text style={styles.title}>{name}</Text>
          <View style={styles.returnBadge}>
            <Ionicons name='trending-up' size={14} color='#10B981' />
            <Text style={styles.returnBadgeText}>+{formatNumber(expectedAnnualReturn)}%</Text>
          </View>
        </View>

        {/* Description Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name='document-text-outline' size={18} color='#6366F1' />
            <Text style={styles.cardTitle}>About this Investment</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsCard}>
          <StatItem
            icon='trending-up'
            iconColor='#10B981'
            iconBg='rgba(16, 185, 129, 0.1)'
            label='Expected Annual Return'
            value={`${formatNumber(expectedAnnualReturn)}%`}
          />
          <View style={styles.statDivider} />
          <StatItem
            icon='time-outline'
            iconColor='#F59E0B'
            iconBg='rgba(245, 158, 11, 0.1)'
            label='Investment Duration'
            value={`${duration} months`}
          />
          <View style={styles.statDivider} />
          <StatItem
            icon='wallet-outline'
            iconColor='#6366F1'
            iconBg='rgba(99, 102, 241, 0.1)'
            label='Minimum Investment'
            value={`${formatNumber(minimumAmount)} ${CURRENCY}`}
          />
        </View>
      </ScrollView>

      {/* Fixed Bottom CTA */}
      <View style={[styles.ctaContainer, { paddingBottom: insets.bottom + 16 }]}>
        {hasInsufficientBalance && (
          <View style={styles.insufficientBalanceWarning}>
            <Ionicons name='alert-circle' size={16} color='#F59E0B' />
            <Text style={styles.insufficientBalanceText}>
              Insufficient balance. You need {formatNumber(minimumAmount - availableBalance)} {CURRENCY} more.
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.ctaButton, hasInsufficientBalance && styles.ctaButtonDisabled]}
          activeOpacity={0.85}
          disabled={hasInsufficientBalance}
        >
          <View style={styles.ctaContent}>
            <Text style={styles.ctaLabel}>Invest</Text>
            <Text style={styles.ctaAmount}>
              {formatNumber(minimumAmount)} {CURRENCY}
            </Text>
          </View>
          <View style={[styles.ctaIconContainer, hasInsufficientBalance && styles.ctaIconContainerDisabled]}>
            <Ionicons name='arrow-forward' size={20} color='#FFFFFF' />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

type StatItemProps = {
  icon: keyof typeof Ionicons.glyphMap
  iconColor: string
  iconBg: string
  label: string
  value: string
}

const StatItem = ({ icon, iconColor, iconBg, label, value }: StatItemProps) => {
  return (
    <View style={styles.statItem}>
      <View style={[styles.statIcon, { backgroundColor: iconBg }]}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  )
}
