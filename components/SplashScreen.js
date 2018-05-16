import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

const SplashScreen = () =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        container: {
          backgroundColor: colors.bgHeader
        },
        logoText: {
          color: colors.logo
        }
      }

      return (
        <View style={[styles.container, theme.container]}>
          <View style={styles.logo}>
            <Text style={[styles.logoText, theme.logoText]}>EQ</Text>
          </View>
        </View>
      )
    }}
  </ThemeConsumer>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    paddingTop: 30
  },
  logoText: {
    fontSize: 64,
    fontFamily: 'DIN Condensed',
    fontWeight: '700'
  }
})

export default SplashScreen
