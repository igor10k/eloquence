import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

import TranslationsItem from './TranslationsItem'

const Translations = ({ translations }) =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        emptyText: {
          color: colors.textGray
        }
      }

      if (translations.length) {
        return (
          <View style={styles.results}>
            {translations.map((translation, index) =>
              <TranslationsItem data={translation} key={index} />
            )}
          }
          </View>
        )
      }

      return (
        <View style={styles.empty}>
          <Text style={[styles.emptyText, theme.emptyText]}>No translation found</Text>
        </View>
      )
    }}
  </ThemeConsumer>

const styles = StyleSheet.create({
  results: {
    padding: 12
  },
  empty: {
    paddingTop: 30,
    alignItems: 'center'
  },
  emptyText: {
    fontSize: 16
  }
})

export default Translations
