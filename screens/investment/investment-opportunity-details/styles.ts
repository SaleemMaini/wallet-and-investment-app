import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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
  ctaButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1
  },
  ctaIconContainerDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)'
  },
  insufficientBalanceWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12
  },
  insufficientBalanceText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    color: '#B45309'
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
