import dayjs from 'dayjs'

import 'dayjs/locale/ar'

export function formatDateToShortString(date: Date | string) {
  return dayjs(date).format('D MMM YYYY')
}

export const dateTimeFormat = (date: Date | string): string => {
  return dayjs(date).format('D MMM YYYY hh:mm A')
}

export const dateYMDFormatWithTime = (date: Date | string): string => {
  return dayjs(date).format('YYYY/MM/DD hh:mm A')
}
