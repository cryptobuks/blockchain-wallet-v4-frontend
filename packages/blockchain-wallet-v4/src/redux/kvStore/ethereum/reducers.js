import { map, over, lensProp, compose, defaultTo } from 'ramda'
import * as T from './actionTypes.js'
import { EthWallet } from '../../../types/ethereum'
import { makeReducer } from '../../util'

const INITIAL_STATE = null

const ethereum = lensProp('ethereum')

let withDefault = defaultTo({ ethereum: EthWallet.factory() })
let overState = (f, state) => map(compose(over(ethereum, f), withDefault), state)

const ethereumReducer = makeReducer(INITIAL_STATE, {
  [T.SET_ETHEREUM] (_, { payload }) {
    return payload.data
  },
  [T.CREATE_ACCOUNT] (state, { payload }) {
    return overState(EthWallet.createAccount(payload.masterNode), state)
  },
  [T.SET_HAS_SEEN] (state, { payload }) {
    return overState(EthWallet.setHasSeen(payload.hasSeen), state)
  },
  [T.SET_LAST_TX] (state, { payload }) {
    return overState(EthWallet.setLastTx(payload.lastTx), state)
  }
})

export default ethereumReducer
