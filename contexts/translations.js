import React from 'react'
import { AsyncStorage } from 'react-native'

import { fetchTranslationsData } from '../helpers/backend'

const initialState = {
  initialized: false,
  isFetching: false,
  word: '',
  translations: null,
  corrections: null,
  language: 'en',
  error: null,

  fetchTranslations: () => {},
  setLanguage: () => {},
  setWord: () => {}
}

export const TranslationsContext = React.createContext(initialState)

export class TranslationsProvider extends React.Component {
  state = {
    ...initialState,

    fetchTranslations: (word) => {
      this.setState({ isFetching: true, word })

      fetchTranslationsData(word, this.state.language).then(data => {
        this.setState({ isFetching: false, translations: null, corrections: null, ...data })
      }).catch(error => {
        this.setState({ isFetching: false, error })
      })
    },

    setLanguage: (language) => {
      this.setState({ language })

      this.persistLanguage(language)
    },

    setWord: (word) => {
      if (this.state.word !== word) {
        this.setState({ word })
      }
    }
  }

  async componentDidMount () {
    const language = await this.restoreLanguage()
    if (language) {
      this.setState({ language })
    }
    this.setState({ initialized: true })
  }

  async restoreLanguage () {
    try {
      return await AsyncStorage.getItem('@MTStore:language')
    } catch (error) {
      console.error(error)
    }
  }

  async persistLanguage (language) {
    try {
      await AsyncStorage.setItem('@MTStore:language', language)
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <TranslationsContext.Provider value={this.state}>
        {this.props.children}
      </TranslationsContext.Provider>
    )
  }
}

export const TranslationsConsumer = TranslationsContext.Consumer
