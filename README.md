# Wallet & Investment App

A React Native mobile application built with Expo.

## Tech Stack

- **React Native** (0.81.5) with **Expo** (~54.0)
- **Expo Router** for file-based navigation
- **TanStack React Query** for server state management
- **Axios** with mock adapter for API simulation
- **TypeScript** for type safety
- **FlashList** for performant lists
- **Big.js** for precise monetary calculations

### Prerequisites

- Node.js (v18 or higher)
- pnpm
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

### Installation

1. **Install dependencies**

   ```bash
   pnpm install
   ```

2. **Prebuild the project**

   ```bash
   npx expo prebuild
   ```

3. **Run on specific platforms:**

```bash
# iOS
pnpm ios

# Android
pnpm android
```

## Project Structure

```text
├── api/
│   ├── axios.ts          # Axios configuration with mock adapter
│   ├── endpoints.ts      # API endpoint definitions
│   ├── hooks/            # React Query hooks for data fetching
│   │   ├── investment.ts
│   │   └── wallet.ts
│   └── data/             # Mock data for development
│       ├── investment.ts
│       └── wallet.ts
├── app/                  # Expo Router screens (file-based routing)
│   ├── _layout.tsx       # Root layout with providers
│   ├── (tabs)/           # Tab navigator screens
│   │   ├── index.tsx     # Home tab
│   │   └── wallet.tsx    # Wallet tab
│   └── investment-opportunity/
│       └── [id].tsx      # Dynamic investment details route
├── components/           # Reusable UI components
├── constants/            # App-wide constants (currency, theme)
├── hooks/                # Custom React hooks
├── lib/                  # Third-party library configurations
├── screens/              # Screen components
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
```

---

## State Management Across Screens

This app uses **TanStack React Query** for server state management, providing a declarative and efficient approach to data fetching, caching, and synchronization.

### Cross-Screen Synchronization

The key to keeping state consistent across screens is **cache invalidation on mutations**. When a user invests in an opportunity, the mutation automatically invalidates related queries:

```typescript
// From api/hooks/investment.ts
export const useInvestOpportunityMutation = () => {
  const mutation = useMutation({
    mutationFn: ({ id, payload }) => ConfiguredAxios.post(END_POINTS.investmentOpportunity(id), payload),
    onSuccess: () => {
      // Invalidate wallet data to reflect the new balance
      queryClient.invalidateQueries({ queryKey: ['wallet-balances'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-transactions'] })
    }
  })
  return mutation
}
```

This means when a user:

1. Invests from the **Investment Details** screen
2. Returns to the **Home** or **Wallet** screen

The balance summary and transactions list will automatically refetch fresh data, ensuring consistency without manual state synchronization.

### Benefits of This Approach

- **No prop drilling**: Components fetch their own data using hooks
- **Automatic caching**: Repeated queries hit the cache instead of making network requests
- **Background refetching**: Data stays fresh without manual intervention
- **Loading & error states**: Built-in support via `isLoading`, `error`, and `isPending` flags
- **Optimistic updates**: Easy to implement for improved perceived performance

---

## Money Value Handling

Handling monetary values in JavaScript requires special care due to floating-point precision issues. This app implements a robust strategy using multiple layers of protection.

### Precision with Big.js

For calculations involving money (like summing balances), the app uses **Big.js** to avoid floating-point errors:

```typescript
// components/balance-summary/utils.ts
import { Big } from 'big.js'

export const calcTotalBalance = (available: number, invested: number) => {
  return new Big(available).plus(invested).toNumber()
}
```

This ensures that `1234.23 + 5000.00` equals exactly `6234.23`, not `6234.229999999999` or similar floating-point artifacts.

### Consistent Currency Display

A centralized currency constant ensures consistent formatting across the app:

```typescript
// constants/currency.ts
export const CURRENCY = 'SAR' // Saudi Riyal
```

### Number Formatting

A utility function handles locale-aware number formatting with decimal precision:

```typescript
// utils/format-number.ts
export const formatNumber = (number: number): string => number.toLocaleString('en-US', { maximumFractionDigits: 2 })
```

This formats `1234567.89` as `1,234,567.89` for readability.

### Usage Pattern

Components combine these utilities for consistent money display:

```tsx
<Text>
  {formatNumber(minimumAmount)} {CURRENCY}
</Text>
// Output: "1,000 SAR"
```

### Type Safety

TypeScript types explicitly define monetary fields as `number`:

```typescript
// types/wallet.ts
export type WalletBalancesResponse = {
  available: number
  invested: number
}

// types/investment.ts
export type InvestmentOpportunity = {
  minimumAmount: number
  expectedAnnualReturn: number
  // ...
}
```

---

## API Mock Structure

The app uses `axios-mock-adapter` to simulate a REST API. This allows development without a backend:

| Endpoint                        | Method | Description                           |
| ------------------------------- | ------ | ------------------------------------- |
| `/wallet/balances`              | GET    | Fetch available and invested balances |
| `/wallet/transactions`          | GET    | Fetch transaction history             |
| `/investment/opportunities`     | GET    | List all investment opportunities     |
| `/investment/opportunities/:id` | GET    | Get single opportunity details        |
| `/investment/opportunities/:id` | POST   | Invest in an opportunity              |

---

## What I Would Improve With More Time

### 1. **Enhance the UI Design & Use NativeWind for Styling**

Migrate from inline `StyleSheet` objects to **NativeWind** (Tailwind CSS for React Native) for a more maintainable and consistent styling approach:

- Utility-first classes for rapid UI development (`className="p-4 bg-white rounded-xl shadow-md"`)
- Reduced style boilerplate and improved developer experience
- Better alignment with web Tailwind workflows for teams working across platforms

### 2. **Form Validation & Custom Investment Amounts**

Allow users to input custom investment amounts (above the minimum) with proper validation:

- Min/max constraints
- Decimal input handling
- Real-time balance validation

### 3. **Unit & Integration Tests**

Add comprehensive testing:

- Unit tests for utility functions (`formatNumber`, `calcTotalBalance`)
- Integration tests for React Query hooks
- E2E tests with Detox for critical user flows

### 4. **Backend API Integration**

Replace the mock adapter with a real API:

- Environment-based configuration
- Proper authentication flow
- Refresh token handling

### 5. **Internationalization (i18n)**

Add multi-language support:

- RTL layout support (important for Arabic)
- Locale-aware date and number formatting
- Translated strings

### 6. **EAS Workflows & Over-the-Air Updates**

Implement **Expo Application Services (EAS)** for streamlined CI/CD and instant updates:

- **EAS Build**: Cloud-based native builds for iOS and Android without local Xcode/Android Studio setup
- **EAS Submit**: Automated submission to App Store and Google Play directly from CI
- **EAS Update**: Push JavaScript bundle updates instantly to users without app store review
- **Build profiles**: Separate configurations for development, preview, and production builds

---
