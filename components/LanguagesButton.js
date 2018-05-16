import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

import Button from './Button'
import LanguagesModal from './LanguagesModal'

class Language extends React.Component {
  static propTypes = {
    language: PropTypes.string,
    onChoose: PropTypes.func
  }

  state = {
    isModalVisible: false
  }

  showModal = () => {
    this.setState({
      isModalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      isModalVisible: false
    })
  }

  handleChoose = (language) => {
    this.props.onChoose(language)
    this.hideModal()
  }

  render () {
    return (
      <ThemeConsumer>
        {({ colors }) => {
          const theme = {
            button: {
              borderColor: colors.textHeader
            },
            text: {
              color: colors.textHeader
            }
          }

          return (
            <View>
              <LanguagesModal
                visible={this.state.isModalVisible}
                onClosePress={this.hideModal}
                onChoose={this.handleChoose}
              />

              <View style={styles.buttonContainer}>
                <Button square onPress={this.showModal}>
                  <View style={[styles.button, theme.button]}>
                    <Text style={[styles.text, theme.text]}>{this.props.language.toUpperCase()}</Text>
                  </View>
                </Button>
              </View>
            </View>
          )
        }}
      </ThemeConsumer>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginLeft: -3
  },
  button: {
    width: 38,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 3
  },
  text: {
    fontWeight: '500',
    fontSize: 17
  }
})

export default Language
