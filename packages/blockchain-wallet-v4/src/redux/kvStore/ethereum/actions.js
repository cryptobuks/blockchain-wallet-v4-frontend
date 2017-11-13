import * as T from './actionTypes'

export const setEthereum = (data) => ({ type: T.SET_ETHEREUM, payload: { data } })
export const createAccount = (masterSeed) => ({ type: T.CREATE_ACCOUNT, payload: { masterSeed } })
export const setHasSeen = (hasSeen) => ({ type: T.SET_HAS_SEEN, payload: { hasSeen } })
export const setLastTx = (lastTx) => ({ type: T.SET_LAST_TX, payload: { lastTx } })
