import React from 'react'
import { AsyncStorage } from 'react-native'

import { fetchTranslationsData } from '../helpers/backend'

const initialState = {
  initialized: false,
  isFetching: false,
  entities: null,
  language: 'en',
  error: null,

  fetchTranslations: () => {},
  setLanguage: () => {}
}

export const TranslationsContext = React.createContext(initialState)

export class TranslationsProvider extends React.Component {
  state = {
    ...initialState,

    fetchTranslations: (word) => {
      this.setState({ isFetching: true })

      fetchTranslationsData(word, this.state.language).then(entities => {
        this.setState({ isFetching: false, entities })
      }).catch(error => {
        this.setState({ isFetching: false, error })
      })
    },

    setLanguage: (language) => {
      this.setState({ language })

      this.persistLanguage(language)
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
