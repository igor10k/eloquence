import React from 'react'
import { StyleSheet, View } from 'react-native'

import { TranslationsProvider, TranslationsConsumer } from '../contexts/translations'
import { ThemeProvider, ThemeConsumer } from '../contexts/theme'
import { SettingsProvider, SettingsConsumer } from '../contexts/settings'

import SplashScreen from '../components/SplashScreen'
import Results from '../components/Results'
import Header from '../components/Header'

class Main extends React.Component {
  render () {
    return (
      <ThemeProvider>
        <TranslationsProvider>
          <SettingsProvider>
            <SettingsConsumer>
              {({ initialized: settingsInitialized }) =>
                <TranslationsConsumer>
                  {({ isFetching, initialized: translationsInitialized }) =>
                    <ThemeConsumer>
                      {({ colors, initialized: themeInitialized }) => {
                        const theme = {
                          container: {
                            backgroundColor: colors.bg
                          }
                        }

                        if (!translationsInitialized || !themeInitialized || !settingsInitialized) {
                          return (
                            <SplashScreen />
                          )
                        }

                        return (
                          <View style={[styles.container, theme.container]}>
                            <Header isFetching={isFetching} />

                            <View style={styles.results}>
                              <Results />
                            </View>
                          </View>
                        )
                      }}
                    </ThemeConsumer>
                  }
                </TranslationsConsumer>
              }
            </SettingsConsumer>
          </SettingsProvider>
        </TranslationsProvider>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center'
  },
  translateField: {

  },
  results: {
    flex: 1
  }
})

export default Main
