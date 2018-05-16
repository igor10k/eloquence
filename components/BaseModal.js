import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Modal, StatusBar } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

import ModalHeader from './ModalHeader'

const BaseModal = ({ visible, onClosePress, children }) =>
  <ThemeConsumer>
    {({ colors, theme: themeName }) => {
      const theme = {
        content: {
          backgroundColor: colors.bgGray
        }
      }

      return (
        <Modal animationType='slide' transparent={false} visible={visible}>
          <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} animated />

          <View style={styles.container}>
            <ModalHeader title='Settings' onClosePress={onClosePress} />

            <View style={[styles.content, theme.content]}>
              {children}
            </View>
          </View>
        </Modal>
      )
    }}
  </ThemeConsumer>

BaseModal.propTypes = {
  visible: PropTypes.bool,
  onClosePress: PropTypes.func,
  children: PropTypes.node
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    paddingTop: 30,
    flex: 1
  }
})

export default BaseModal
