import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'
import { SettingsConsumer } from '../contexts/settings'

const ResultsItem = ({ data }) => {
  return (
    <ThemeConsumer>
      {({ colors }) => {
        const theme = {
          spellingText: {
            color: colors.text
          },
          spellingClassText: {
            color: colors.textGray
          },
          category: {
            borderLeftColor: colors.accent
          },
          categoryText: {
            color: colors.text
          },
          text: {
            color: colors.text
          },
          noteText: {
            color: colors.textGray
          }
        }

        const renderTranslations = (translations, areNotesHidden) => {
          return translations.split(/(\s\(.+?\))/).map((str, index) => {
            const isNote = /^\s*\(/.test(str)

            if (areNotesHidden && isNote) {
              return false
            }

            return (
              <Text
                key={index}
                style={isNote ? [styles.noteText, theme.noteText] : [styles.text, theme.text]}
              >
                {str}
              </Text>
            )
          })
        }

        return (
          <SettingsConsumer>
            {({ areNotesHidden }) =>
              <View style={styles.container}>
                <View style={styles.spelling}>
                  <Text style={[styles.spellingText, theme.spellingText]}>{data.spelling}</Text>
                  <Text style={[styles.spellingClassText, theme.spellingClassText]}>{data.class}</Text>
                </View>

                {data.dictionaries.map((dictionary, index) =>
                  <View style={styles.dictionary} key={index}>
                    <View style={[styles.category, theme.category]}>
                      <Text style={[styles.categoryText, theme.categoryText]}>{dictionary.name}</Text>
                    </View>

                    <View style={styles.translations}>
                      <Text>{renderTranslations(dictionary.translations, areNotesHidden)}</Text>
                    </View>
                  </View>
                )}
              </View>
            }
          </SettingsConsumer>
        )
      }}
    </ThemeConsumer>
  )
}

ResultsItem.propTypes = {
  data: PropTypes.object
}

const styles = StyleSheet.create({
  container: {

  },
  spelling: {
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingBottom: 15
  },
  spellingText: {
    fontSize: 20
  },
  spellingClassText: {
    marginLeft: 10,
    fontSize: 14,
    fontStyle: 'italic'
  },
  dictionary: {
    paddingBottom: 15
  },
  category: {
    borderLeftWidth: 2,
    paddingLeft: 10,
    marginBottom: 5
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700'
  },
  translations: {

  },
  text: {
    fontSize: 14
  },
  noteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#999'
  }
})

export default ResultsItem
