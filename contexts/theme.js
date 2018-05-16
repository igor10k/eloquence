import React from 'react'
import { AsyncStorage, StatusBar } from 'react-native'

const colors = {
  light: {
    accent: '#6CAB41',
    bg: '#FFF',
    bgGray: '#f8f8f8',
    bgHeader: '#6CAB41',
    bgHeaderActive: '#8CBB41',
    bgButtonActive: '#EEE',
    text: '#000',
    textGray: '#999',
    textHeader: '#FFF',
    placeholder: '#FFF7',
    border: '#CCC',
    logo: '#436A28'
  },
  dark: {
    accent: '#436A28',
    bg: '#000',
    bgGray: '#111',
    bgHeader: '#436A28',
    bgHeaderActive: '#538A28',
    bgButtonActive: '#1e1e1e',
    text: '#FFF',
    textGray: '#999',
    textHeader: '#FFF',
    placeholder: '#FFF7',
    border: '#444',
    logo: '#6CAB41'
  }
}

const initialState = {
  initialized: false,
  theme: 'light',
  colors: colors.light,

  setTheme: () => {}
}

export const ThemeContext = React.createContext(initialState)

export class ThemeProvider extends React.Component {
  state = {
    ...initialState,

    setTheme: (theme) => {
      this.setState({
        theme,
        colors: colors[theme]
      })
      this.persistTheme(theme)
    }
  }

  async componentDidMount () {
    const theme = await this.restoreTheme()
    if (theme) {
      this.setState({
        theme,
        colors: colors[theme]
      })
    }
    this.setState({ initialized: true })
  }

  async restoreTheme () {
    try {
      return await AsyncStorage.getItem('@MTStore:theme')
    } catch (error) {
      console.error(error)
    }
  }

  async persistTheme (theme) {
    try {
      await AsyncStorage.setItem('@MTStore:theme', theme)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <ThemeContext.Provider value={this.state}>
        <StatusBar barStyle='light-content' animated />
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

export const ThemeConsumer = ThemeContext.Consumer
