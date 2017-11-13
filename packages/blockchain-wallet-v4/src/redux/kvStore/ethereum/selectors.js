import { concat, compose, head, map, path, prop, isNil, defaultTo } from 'ramda'
// import { KVStoreEntry } from '../../../types'
import { ETHEREUM } from '../config'

export const getAccounts = path([ETHEREUM, 'value', 'ethereum', 'accounts'])

export const getLegacyAccount = path([ETHEREUM, 'value', 'ethereum', 'legacy_account'])

export const getLegacyAccountAddress = compose(prop('addr'), getLegacyAccount)

export const getDefaultAccountAddress = compose(prop('addr'), head, getAccounts)

// getContext :: State -> [String]
export const getContext = state => {
  const legacyAccount = getLegacyAccount(state)
  const accounts = defaultTo([], getAccounts(state))
  const allAccounts = !isNil(legacyAccount) ? concat([legacyAccount], accounts) : accounts
  return map(account => account.addr, allAccounts)
}
