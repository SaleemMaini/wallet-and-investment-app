import { useInvestmentOpportunityQuery } from '@/api/hooks/investment'
import { CURRENCY } from '@/constants/currency'
import { formatNumber } from '@/utils/format-number'
import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const InvestmentOpportunityDetailsScreen = () => {
  // Hooks
  const { id } = useLocalSearchParams<{ id: string }>()
  const router = useRouter()
  const insets = useSafeAreaInsets()

  // Query
  const { data, isLoading, error } = useInvestmentOpportunityQuery(id)
  const opportunity = data?.data.data

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
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
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
        <TouchableOpacity style={styles.ctaButton} activeOpacity={0.85}>
          <View style={styles.ctaContent}>
            <Text style={styles.ctaLabel}>Invest</Text>
            <Text style={styles.ctaAmount}>
              {formatNumber(minimumAmount)} {CURRENCY}
            </Text>
          </View>
          <View style={styles.ctaIconContainer}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  scrollView: {
    flex: 1
  },
  scrollContent: {
    padding: 20,
    gap: 20
  },
  // Back button
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1
  },
  // Header
  header: {
    alignItems: 'center',
    gap: 14,
    paddingVertical: 10
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1F2937',
    textAlign: 'center',
    letterSpacing: -0.5
  },
  returnBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 20
  },
  returnBadgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981'
  },
  // Cards
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6366F1'
  },
  description: {
    fontSize: 15,
    lineHeight: 24,
    color: '#4B5563'
  },
  // Stats card
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statContent: {
    flex: 1,
    gap: 2
  },
  statLabel: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500'
  },
  statValue: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: -0.3
  },
  statDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 14
  },
  // Notice
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: 'rgba(99, 102, 241, 0.06)',
    borderRadius: 14,
    padding: 14
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: '#6B7280'
  },
  // CTA
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)'
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6366F1',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6
  },
  ctaContent: {
    gap: 2
  },
  ctaLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)'
  },
  ctaAmount: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5
  },
  ctaIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  // States
  stateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    gap: 12,
    padding: 24
  },
  loadingText: {
    fontSize: 15,
    color: '#9CA3AF',
    fontWeight: '500'
  },
  errorIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937'
  },
  errorSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center'
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#6366F1',
    borderRadius: 10
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF'
  }
})
