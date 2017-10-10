import React from 'react'

import EmailVerification from './template.js'

class EmailVerificationContainer extends React.Component {
  render () {
    return (
      <EmailVerification success={false} />
    )
  }
}

export default EmailVerificationContainer
