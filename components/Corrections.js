import React from 'react'

import { TranslationsConsumer } from '../contexts/translations'

import List from './List'
import ListItem from './ListItem'

const Corrections = ({ corrections }) =>
  <TranslationsConsumer>
    {({ fetchTranslations }) =>
      <List>
        {corrections.map((correction, index) =>
          <ListItem
            key={index}
            last={index + 1 === corrections.length}
            label={correction}
            onPress={() => fetchTranslations(correction)}
          />
        )}
      </List>
    }
  </TranslationsConsumer>

export default Corrections
