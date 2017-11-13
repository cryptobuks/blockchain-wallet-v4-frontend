import { makeNamespace } from '../../util'

const ns = makeNamespace('@CORE.KVSTORE')

export const SET_ETHEREUM = ns('SET_ETHEREUM')
export const CREATE_ACCOUNT = ns('CREATE_ACCOUNT')
export const SET_HAS_SEEN = ns('SET_HAS_SEEN')
export const SET_LAST_TX = ns('SET_LAST_TX')
