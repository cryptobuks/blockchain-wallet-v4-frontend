import { concat, compose, head, map, path, prop, isNil, defaultTo } from 'ramda'
// import { KVStoreEntry } from '../../../types'
import { ETHEREUM } from '../config'

const root = path([ETHEREUM, 'value', 'ethereum'])

export const getAccounts = compose(prop('accounts'), root)

export const getDefaultAccount = compose(head, getAccounts)

export const getLegacyAccount = compose(prop('legacy_account'), root)

export const getLegacyAccountAddress = compose(prop('addr'), getLegacyAccount)

export const getDefaultAccountAddress = compose(prop('addr'), getDefaultAccount)

// getContext :: State -> [String]
export const getContext = state => {
  const legacyAccount = getLegacyAccount(state)
  const accounts = defaultTo([], getAccounts(state))
  const allAccounts = !isNil(legacyAccount) ? concat([legacyAccount], accounts) : accounts
  return map(account => account.addr, allAccounts)
}
