import React from 'react'
import { TextInput, StyleSheet } from 'react-native'

import { TranslationsConsumer } from '../contexts/translations'
import { ThemeConsumer } from '../contexts/theme'

class TranslateField extends React.Component {
  state = {
    text: ''
  }

  handleTextChange = (text) => {
    this.setState({ text })
  }

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
              {({ fetchTranslations }) =>
                <TextInput
                  placeholder='Tap to type...'
                  style={[styles.input, theme.input]}
                  clearButtonMode='while-editing'
                  autoCapitalize='none'
                  enablesReturnKeyAutomatically
                  onSubmitEditing={() => fetchTranslations(this.state.text)}
                  onChangeText={this.handleTextChange}
                  value={this.state.text}
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
