import React from 'react'
import { View, StyleSheet } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { ThemeConsumer } from '../contexts/theme'

import SettingsModal from './SettingsModal'
import Button from './Button'

class SettingsButton extends React.Component {
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

  render () {
    return (
      <ThemeConsumer>
        {({ colors }) =>
          <View>
            <SettingsModal
              visible={this.state.isModalVisible}
              onClosePress={this.hideModal}
            />

            <View style={styles.button}>
              <Button square onPress={this.showModal}>
                <FontAwesome name='cog' size={24} color={colors.textHeader} />
              </Button>
            </View>
          </View>
        }
      </ThemeConsumer>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginRight: -10
  }
})

export default SettingsButton
