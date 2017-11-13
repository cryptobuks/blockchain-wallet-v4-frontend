import { over, lensProp } from 'ramda'
import * as T from './actionTypes.js'
import { EthWallet } from '../../../types/ethereum'
import { makeReducer } from '../../util'

const INITIAL_STATE = {}

const ethereum = lensProp('ethereum')

const ethereumReducer = makeReducer(INITIAL_STATE, {
  [T.SET_ETHEREUM] (_, { payload }) {
    return payload.data
  },
  [T.CREATE_ACCOUNT] (state, { payload }) {
    return over(ethereum, EthWallet.createAccount(payload.masterSeed), state)
  },
  [T.SET_HAS_SEEN] (state, { payload }) {
    return over(ethereum, EthWallet.setHasSeen(payload.hasSeen), state)
  },
  [T.SET_LAST_TX] (state, { payload }) {
    return over(ethereum, EthWallet.setLastTx(payload.lastTx), state)
  }
})

export default ethereumReducer
