import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

const List = ({ children }) =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        list: {
          borderColor: colors.border,
          backgroundColor: colors.bg
        }
      }

      return (
        <View style={[styles.list, theme.list]}>
          {children}
        </View>
      )
    }}
  </ThemeConsumer>

List.propTypes = {
  children: PropTypes.node
}

const styles = StyleSheet.create({
  list: {
    borderColor: '#AAA',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingLeft: 12
  }
})

export default List
