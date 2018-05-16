import React from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'

import { TranslationsConsumer } from '../contexts/translations'

import LanguagesButton from '../components/LanguagesButton'
import SettingsButton from '../components/SettingsButton'
import Logo from '../components/Logo'

const Menu = () =>
  <SafeAreaView>
    <View style={styles.container}>
      <View style={styles.language}>
        <TranslationsConsumer>
          {({ language, setLanguage }) =>
            <LanguagesButton language={language} onChoose={setLanguage} />
          }
        </TranslationsConsumer>
      </View>

      <View style={styles.logo}>
        <Logo />
      </View>

      <View style={styles.settings}>
        <SettingsButton />
      </View>
    </View>
  </SafeAreaView>

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 12,
    paddingLeft: 12,
    height: 44
  },
  language: {
    flex: 1,
    alignItems: 'flex-start'
  },
  logo: {
    flex: 1,
    alignItems: 'center'
  },
  settings: {
    flex: 1,
    alignItems: 'flex-end'
  }
})

export default Menu
