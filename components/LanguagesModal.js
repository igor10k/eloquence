import React from 'react'
import PropTypes from 'prop-types'

import BaseModal from './BaseModal'
import List from './List'
import ListItem from './ListItem'

const items = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'es', label: 'Spanish' },
  { value: 'it', label: 'Italian' }
]

const LanguagesModal = ({ visible, onClosePress, onChoose }) =>
  <BaseModal
    visible={visible}
    title='Languages'
    onClosePress={onClosePress}
  >
    <List>
      {items.map((item, index) =>
        <ListItem
          key={index}
          last={items.length === index + 1}
          label={item.label}
          onPress={() => onChoose(item.value)}
        />
      )}
    </List>
  </BaseModal>

LanguagesModal.propTypes = {
  visible: PropTypes.bool,
  onClosePress: PropTypes.func,
  onChoose: PropTypes.func
}

export default LanguagesModal
