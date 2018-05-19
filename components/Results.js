import React from 'react'
import { ScrollView } from 'react-native'

import { TranslationsConsumer } from '../contexts/translations'

import Translations from './Translations'
import Corrections from './Corrections'

const Results = () =>
  <TranslationsConsumer>
    {({ translations, corrections }) =>
      <ScrollView>
        {translations &&
          <Translations translations={translations} />
        }
        {corrections &&
          <Corrections corrections={corrections} />
        }
      </ScrollView>
    }
  </TranslationsConsumer>

export default Results
