import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'data'

import LoginAuthorization from './template.js'

class LoginAuthorizationContainer extends React.Component {
  constructor (props) {
    super(props)
    this.handleAccept = this.handleAccept.bind(this)
    this.handleReject = this.handleReject.bind(this)
  }

  componentWillMount () {
    const { status } = this.props
    const { token } = this.props.match.params
    if (status === 'token') {
      const confirmed = true
      this.props.authActions.authorizeLogin(token, confirmed)
    }
  }

  handleAccept () {
    const confirmed = true
    const { token } = this.props.match.params
    this.props.authActions.authorizeLogin(token, confirmed)
  }

  handleReject () {
    const confirmed = false
    const { token } = this.props.match.params
    this.props.authActions.authorizeLogin(token, confirmed)
  }

  render () {
    const { status } = this.props
    return (
      <LoginAuthorization status={status}
        requestingBrowser='Chrome'
        requestingIP='IP address'
        requestingCountry='UK'
        thisDeviceBrowser='Chrome'
        thisDeviceIP='IP address'
        thisDeviceCountry='UK'
        handleAccept={this.handleAccept}
        handleReject={this.handleReject} />
    )
  }
}

const mapStateToProps = (state) => ({
  tokenStatus: 'token-other-browser'
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(actions.auth, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthorizationContainer)
