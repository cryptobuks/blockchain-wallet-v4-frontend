import React from 'react'
import {connect} from 'react-redux'
import { prop, mapAccum, head } from 'ramda'

import { selectors } from 'data'
import BalanceSummary from './template.js'

class BalanceSummaryContainer extends React.Component {
  render () {
    const adder = (acc, value) => [acc + (prop('amount', value) || 0), (acc + prop('amount', value) || 0)]
    const btcTotal = head(mapAccum(adder, 0, this.props.bitcoinBalances))
    return (
      <BalanceSummary bitcoinBalances={this.props.bitcoinBalances} etherBalance={this.props.etherBalance} btcTotal={btcTotal} coinDisplayed={this.props.coinDisplayed} />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const bitcoinAccountsBalances = selectors.core.common.getAccountsBalances(state)
  const aggregatedLegacyAddressesBalances = selectors.core.common.getAggregatedAddressesBalances(state)
  return {
    bitcoinBalances: [...bitcoinAccountsBalances, aggregatedLegacyAddressesBalances],
    coinDisplayed: selectors.preferences.getCoinDisplayed(state),
    etherBalance: selectors.core.data.info.getEtherBalance(state)
  }
}

export default connect(mapStateToProps)(BalanceSummaryContainer)
