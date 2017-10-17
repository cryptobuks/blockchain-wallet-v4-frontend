import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'data'

import EmailVerification from './template.js'

class EmailVerificationContainer extends React.Component {
  // TODO: Saga and API call
  // componentWillMount () {
  //   const { status } = this.props
  //   const { token } = this.props.match
  //   if (status === 'success') {
  //     const confirmed = true
  //     this.props.authActions.verifyEmail(token, confirmed)
  //   }
  // }

  render () {
    const {status} = this.props
    return (
      <EmailVerification status={status} />
    )
  }
}

const mapStateToProps = (state) => ({
  status: 'success'
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(actions.auth, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(EmailVerificationContainer)
