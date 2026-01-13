import { InvestmentOpportunity } from '@/types/investment'

export const investmentOpportunities: InvestmentOpportunity[] = [
  {
    id: '1',
    name: 'Real Estate Fund A',
    description:
      'A diversified real estate investment fund focusing on premium residential and commercial properties in major Saudi cities. This fund offers stable returns through rental income and capital appreciation.',
    minimumAmount: 1000,
    expectedAnnualReturn: 12,
    duration: 24
  },
  {
    id: '2',
    name: 'Real Estate Fund B',
    description:
      'An exclusive fund targeting high-value commercial real estate developments in Riyadh and Jeddah. Ideal for investors seeking medium-term growth with quarterly dividend distributions.',
    minimumAmount: 40000,
    expectedAnnualReturn: 11,
    duration: 24
  },
  {
    id: '3',
    name: 'Real Estate Fund C',
    description:
      'A premium institutional-grade fund investing in landmark properties and mixed-use developments. Features enhanced due diligence and dedicated portfolio management.',
    minimumAmount: 100000,
    expectedAnnualReturn: 10,
    duration: 24
  }
]
