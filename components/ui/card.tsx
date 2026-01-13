import React, { PropsWithChildren } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

export const Card = (props: PropsWithChildren<ViewProps>) => {
  // Props
  const { children, style, ...rest } = props

  // Styles
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#e0dfdf',
    borderRadius: 16,
    gap: 10
  }
})
