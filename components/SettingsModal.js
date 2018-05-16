import React from 'react'
import PropTypes from 'prop-types'

import { ThemeConsumer } from '../contexts/theme'
import { SettingsConsumer } from '../contexts/settings'

import BaseModal from './BaseModal'
import List from './List'
import ListItem from './ListItem'

const SettingsModal = ({ visible, onClosePress, theme, onThemeChange }) =>
  <BaseModal
    visible={visible}
    title='Settings'
    onClosePress={onClosePress}
  >
    <List>
      <ThemeConsumer>
        {({ theme, setTheme }) =>
          <ListItem
            toggle={theme === 'dark'}
            onChange={value => setTheme(value ? 'dark' : 'light')}
            label='Dark theme'
          />
        }
      </ThemeConsumer>
      <SettingsConsumer>
        {({ areNotesHidden, setAreNotesHidden }) =>
          <ListItem
            last
            toggle={areNotesHidden}
            onChange={setAreNotesHidden}
            label='Hide notes'
          />
        }
      </SettingsConsumer>
    </List>
  </BaseModal>

SettingsModal.propTypes = {
  visible: PropTypes.bool,
  onClosePress: PropTypes.func
}

export default SettingsModal
