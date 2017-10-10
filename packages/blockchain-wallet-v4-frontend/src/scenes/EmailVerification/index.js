import React from 'react'

import EmailVerification from './template.js'

class EmailVerificationContainer extends React.Component {
  render () {
    return (
      <EmailVerification status='success' />
    )
  }
}

export default EmailVerificationContainer
