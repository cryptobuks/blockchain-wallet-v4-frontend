import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { convertBaseCoinToFiat, displayWeiToFiat, displayTotalToFiat } from 'services/ConversionService'
import { selectors } from 'data'

const MulticurrencyDisplay = props => {
  const { btcAmount, ethAmount, bitcoinRates, ethereumRates, currency } = props
  console.log(convertBaseCoinToFiat(currency, bitcoinRates, btcAmount))
  console.log(displayWeiToFiat(currency, ethereumRates, ethAmount))
  // console.log(displayTotalToFiat(currency, bitcoinRates, ethereumRates, btcAmount, ethAmount))
  return (
    <div>
      {
        displayTotalToFiat(currency, bitcoinRates, ethereumRates, btcAmount, ethAmount)
        // convertBaseCoinToFiat(currency, bitcoinRates, btcAmount) +
        // displayWeiToFiat(currency, ethereumRates, ethAmount)
      }
    </div>
  )
}

MulticurrencyDisplay.propTypes = {
  btcAmount: PropTypes.number,
  ethAmount: PropTypes.number
}

const mapStateToProps = (state) => ({
  currency: selectors.core.settings.getCurrency(state),
  bitcoinRates: selectors.core.data.rates.getBtcRates(state),
  ethereumRates: selectors.core.data.rates.getEthRates(state)
})

export default connect(mapStateToProps)(MulticurrencyDisplay)
