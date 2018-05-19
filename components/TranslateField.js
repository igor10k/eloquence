import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

import { TranslationsConsumer } from '../contexts/translations'
import { ThemeConsumer } from '../contexts/theme'

class TranslateField extends React.Component {
  render () {
    return (
      <ThemeConsumer>
        {({ colors }) => {
          const theme = {
            input: {
              color: colors.textHeader
            }
          }

          return (
            <TranslationsConsumer>
              {({ fetchTranslations, word, setWord }) =>
                <TextInput
                  placeholder='Tap to type...'
                  style={[styles.input, theme.input]}
                  clearButtonMode='while-editing'
                  autoCapitalize='none'
                  enablesReturnKeyAutomatically
                  onSubmitEditing={() => fetchTranslations(word)}
                  onChangeText={setWord}
                  value={word}
                  placeholderTextColor={colors.placeholder}
                />
              }
            </TranslationsConsumer>
          )
        }}
      </ThemeConsumer>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    paddingStart: 12,
    paddingEnd: 12,
    height: 64
  }
})

export default TranslateField
