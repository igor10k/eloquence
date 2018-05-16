import React from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native'

import { ThemeConsumer } from '../contexts/theme'

import TranslateField from '../components/TranslateField'
import Menu from '../components/Menu'

class Header extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool
  }

  state = {
    progress: new Animated.Value(0)
  }

  componentDidUpdate (prevProps) {
    if (!prevProps.isFetching && this.props.isFetching) {
      Animated.loop(
        Animated.timing(this.state.progress, {
          toValue: 1,
          duration: 1000
        })
      ).start()
    } else if (prevProps.isFetching && !this.props.isFetching) {
      Animated.timing(this.state.progress).stop()
      Animated.timing(this.state.progress, {
        toValue: 0,
        duration: 300
      }).start()
    }
  }

  render () {
    return (
      <ThemeConsumer>
        {({ colors }) => {
          const theme = {
            header: {
              backgroundColor: colors.bgHeader
            }
          }

          return (
            <Animated.View style={[theme.header, {
              backgroundColor: this.state.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [colors.bgHeader, colors.bgHeaderActive, colors.bgHeader]
              })
            }]}>
              <Menu />

              <TranslateField onSubmit={this.fetchTranslations} />
            </Animated.View>
          )
        }}
      </ThemeConsumer>
    )
  }
}

export default Header
