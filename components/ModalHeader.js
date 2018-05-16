import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

import Button from './Button'

const ModalHeader = ({ title, onClosePress }) =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        safearea: {
          backgroundColor: colors.bg
        },
        container: {
          borderBottomColor: colors.border
        },
        titleText: {
          color: colors.text
        },
        buttonText: {
          color: colors.accent
        }
      }

      return (
        <SafeAreaView style={theme.safearea}>
          <View style={[styles.container, theme.container]}>
            <View style={styles.leftButton} />

            <View style={styles.title}>
              <Text style={[styles.titleText, theme.titleText]}>{title}</Text>
            </View>

            <View style={styles.rightButton}>
              <Button onPress={onClosePress}>
                <Text style={[styles.buttonText, theme.buttonText]}>Close</Text>
              </Button>
            </View>
          </View>
        </SafeAreaView>
      )
    }}
  </ThemeConsumer>

ModalHeader.propTypes = {
  title: PropTypes.string,
  onClosePress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    paddingStart: 12,
    paddingEnd: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  leftButton: {
    flex: 1
  },
  button: {

  },
  buttonText: {
    fontSize: 17
  },
  title: {
    flex: 2,
    alignItems: 'center'
  },
  titleText: {
    fontWeight: '600',
    fontSize: 17
  },
  rightButton: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default ModalHeader
