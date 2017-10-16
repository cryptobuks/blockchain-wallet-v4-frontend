import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from 'data'

import LoginAuthorization from './template.js'

class LoginAuthorizationContainer extends React.Component {
  render () {
    const { status } = this.props
    return (
      <LoginAuthorization status={status}
        requestingBrowser='Chrome'
        requestingIP='IP address'
        requestingCountry='UK'
        thisDeviceBrowser='Chrome'
        thisDeviceIP='IP address'
        thisDeviceCountry='UK' />
    )
  }
}

const mapStateToProps = (state) => ({
  status: 'different browser'
})

const mapDispatchToProps = (dispatch) => ({
  alertActions: bindActionCreators(actions.alerts, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginAuthorizationContainer)
