import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ children, square, onPress }) =>
  <TouchableOpacity style={[styles.base, square && styles.square]} onPress={onPress} delayPressIn={0}>
    {children}
  </TouchableOpacity>

Button.propTypes = {
  children: PropTypes.node,
  square: PropTypes.bool,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  base: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },
  square: {
    width: 44
  }
})

export default Button
