import { I18nManager } from 'react-native'

import dayjs from 'dayjs'

import 'dayjs/locale/ar'

export function formatDateToShortString(date: Date | string) {
  return dayjs(date).format('D MMM YYYY')
}

export const dateTimeFormat = (date: Date | string): string => {
  return dayjs(date).format(I18nManager.isRTL ? 'D MMMM YYYY، hh:mm a' : 'YYYY MMM D, hh:mm a')
}

export const dateYMDFormatWithTime = (date: Date | string): string => {
  return dayjs(date).format('YYYY/MM/DD hh:mm A')
}
