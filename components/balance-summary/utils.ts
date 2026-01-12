import { Big } from 'big.js'

export const calcTotalBalance = (available: number, invested: number) => {
  return new Big(available).plus(invested).toNumber()
}
