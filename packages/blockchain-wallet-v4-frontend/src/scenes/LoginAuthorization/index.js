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
    const { status, token } = this.props
    if (status === 'success') {
      const confirmed = true
      this.props.authActions.authorizeLogin(token, confirmed)
    }
  }

  handleAccept () {
    const confirmed = true
    this.props.authActions.authorizeLogin(this.props.token, confirmed)
  }

  handleReject () {
    const confirmed = false
    this.props.authActions.authorizeLogin(this.props.token, confirmed)
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
  status: 'different browser',
  token: 'TGwVv1WYyayb1jtB5qb%2FKdtPMpkwDRa%2BbDk4wjs98r8fDZRO8ppF7EYi4%2B75nTD2IRv8RojpYD7LlUmKCHR0eDE%2FRsOHGrHX08LIVRD7856pMpgnXVL0t1uLmkGjlssDV5pLsl8PMvW0WP5grORqx9mosFGgYxw6jk%2Bt15tfO1qSC%2BImFOwZuhxn0%2BRxcVNC'
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(actions.auth, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthorizationContainer)
