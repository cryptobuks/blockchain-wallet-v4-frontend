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
    const { status, guid } = this.props
    if (status === 'success') {
      this.props.authActions.acceptLogin(guid)
    }
  }

  handleAccept () {
    this.props.authActions.acceptLogin(this.props.guid)
  }

  handleReject () {
    this.props.authActions.rejectLogin(this.props.guid)
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
  guid: 'acb0e256-8d31-45c2-a7b7-9769f3e16fc0'
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(actions.auth, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthorizationContainer)
