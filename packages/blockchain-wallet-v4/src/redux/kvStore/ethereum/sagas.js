import { call, put, select } from 'redux-saga/effects'
import { prop, compose } from 'ramda'
import * as A from './actions'
import { KVStoreEntry, HDWallet } from '../../../types'
import { getDefaultHDWallet } from '../../wallet/selectors'
import { derivationMap, ETHEREUM } from '../config'

const taskToPromise = t => new Promise((resolve, reject) => t.fork(reject, resolve))

export const ethereum = ({ api, kvStorePath, walletPath } = {}) => {
  const selectHdWallet = select(compose(getDefaultHDWallet, prop(walletPath)))

  const callTask = function * (task) {
    return yield call(compose(taskToPromise, () => task))
  }

  const fetchEthereum = function * () {
    const typeId = derivationMap[ETHEREUM]
    const hdwallet = yield selectHdWallet
    const kv = KVStoreEntry.fromHdWallet(hdwallet, typeId)
    const newkv = yield callTask(api.fetchKVStore(kv))
    yield put(A.setEthereum(newkv))
  }

  const createAccount = function * () {
    let hdwallet = yield selectHdWallet
    let masterNode = HDWallet.getMasterHdNode(hdwallet)
    yield put(A.createAccount(masterNode))
  }

  return {
    fetchEthereum,
    createAccount
  }
}
