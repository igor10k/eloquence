import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

const Logo = () =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        logoText: {
          color: colors.logo
        }
      }

      return (
        <View style={styles.logo}>
          <Text style={[styles.logoText, theme.logoText]}>EQ</Text>
        </View>
      )
    }}
  </ThemeConsumer>

const styles = StyleSheet.create({
  logo: {
    paddingTop: 12
  },
  logoText: {
    fontSize: 28,
    fontFamily: 'DIN Condensed',
    fontWeight: '700'
  }
})

export default Logo
