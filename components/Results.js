import React from 'react'
import { StyleSheet, ScrollView, View, Text } from 'react-native'

import { TranslationsConsumer } from '../contexts/translations'
import { ThemeConsumer } from '../contexts/theme'

import ResultsItem from './ResultsItem'

const Results = () =>
  <ThemeConsumer>
    {({ colors }) =>
      <TranslationsConsumer>
        {({ entities: translations }) => {
          const theme = {
            emptyText: {
              color: colors.textGray
            }
          }

          if (translations) {
            if (translations.length) {
              return (
                <ScrollView style={styles.results}>
                  {translations.map((translation, index) =>
                    <ResultsItem data={translation} key={index} />
                  )}
                }
                </ScrollView>
              )
            }

            return (
              <View style={styles.empty}>
                <Text style={[styles.emptyText, theme.emptyText]}>No translation found</Text>
              </View>
            )
          }
        }}
      </TranslationsConsumer>
    }
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

export default Results
