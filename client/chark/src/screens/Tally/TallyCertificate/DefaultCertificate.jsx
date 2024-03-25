import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types';

import CertificateItem from './CertificateItem';

const DefaultCertificate = (props) => {
  return (
    <View>
      <CertificateItem
        label={'formal_name_text'}
        value={props.name}
      />

      <CertificateItem
        label={'cid_text'}
        value={props.cid}
      />

      <CertificateItem
        label={'email_text'}
        value={props.email}
      />

      <CertificateItem
        label={'agent_text'}
        value={props.agent}
      />
    </View>
  )
}

DefaultCertificate.proptypes = {
  name: PropTypes.string.isRequired,
  cid: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  agent: PropTypes.string.isRequired,
};

export default DefaultCertificate;