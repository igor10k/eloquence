import React from 'react'
import { AsyncStorage } from 'react-native'

const initialState = {
  initialized: false,
  areNotesHidden: false,

  setAreNotesHidden: () => {}
}

export const SettingsContext = React.createContext(initialState)

export class SettingsProvider extends React.Component {
  state = {
    ...initialState,

    setAreNotesHidden: (areNotesHidden) => {
      this.setState({ areNotesHidden })

      this.persistAreNotesHidden(areNotesHidden)
    }
  }

  async componentDidMount () {
    const areNotesHidden = (await this.restoreAreNotesHidden()) === 'true'
    if (areNotesHidden) {
      this.setState({ areNotesHidden })
    }
    this.setState({ initialized: true })
  }

  async restoreAreNotesHidden () {
    try {
      return await AsyncStorage.getItem('@MTStore:areNotesHidden')
    } catch (error) {
      console.error(error)
    }
  }

  async persistAreNotesHidden (areNotesHidden) {
    try {
      await AsyncStorage.setItem('@MTStore:areNotesHidden', String(areNotesHidden))
    } catch (error) {
      console.error(error)
    }
  }

  render () {
    return (
      <SettingsContext.Provider value={this.state}>
        {this.props.children}
      </SettingsContext.Provider>
    )
  }
}

export const SettingsConsumer = SettingsContext.Consumer
