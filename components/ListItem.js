import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableHighlight, Switch } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

const ListItem = ({ onChange, onPress, last, toggle, label }) =>
  <ThemeConsumer>
    {({ colors }) => {
      const theme = {
        itemContainer: {
          borderBottomColor: colors.border
        },
        itemText: {
          color: colors.text
        }
      }

      return (
        <View style={[styles.itemContainer, theme.itemContainer, last && styles.itemContainerLast]}>
          {(() => {
            if (toggle === void 0) {
              return (
                <TouchableHighlight
                  style={styles.item}
                  onPress={onPress}
                  underlayColor={colors.bgButtonActive}
                  delayPressIn={0}
                >
                  <Text style={[styles.itemText, theme.itemText]}>{label}</Text>
                </TouchableHighlight>
              )
            } else {
              return (
                <View style={styles.item}>
                  <Text style={[styles.itemText, theme.itemText]}>{label}</Text>
                  <Switch value={toggle} onValueChange={onChange} onTintColor={colors.accent} />
                </View>
              )
            }
          })()}
        </View>
      )
    }}
  </ThemeConsumer>

ListItem.propTypes = {
  onChange: PropTypes.func,
  onPress: PropTypes.func,
  last: PropTypes.bool,
  toggle: PropTypes.bool,
  label: PropTypes.string
}

const styles = StyleSheet.create({
  itemContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  itemContainerLast: {
    borderBottomWidth: 0
  },
  item: {
    height: 44,
    marginStart: -12,
    paddingStart: 12,
    paddingEnd: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  itemText: {
    fontSize: 17
  }
})

export default ListItem
