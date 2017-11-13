import chai from 'chai'
import ethereumReducer from '../../src/redux/kvstore/ethereum/reducers'
import * as actions from '../../src/redux/kvstore/ethereum/actions'
import { EthWallet } from '../../src/types/ethereum'
import { KVStoreEntry } from '../../src/types/KVStoreEntry'
import Bitcoin from 'bitcoinjs-lib'
const { expect } = chai

describe('KVStore.Ethereum.Reducer', () => {
  const masterHex = '265c86692394fab95d0efc4385b89679d8daef5c9975e1f2b1f1eb4300bc10ad81d4d117c323591d543f6e54aa9d4560cad424bc66bb2bb61dc14285a508dad7'
  const masterSeed = Bitcoin.HDNode.fromSeedBuffer(Buffer.from(masterHex, 'hex'))
  const ethWallet = EthWallet.factory()
  const state = KVStoreEntry.of({ ethereum: ethWallet })

  it('should set from kvstore', () => {
    let data = KVStoreEntry.of({ ethereum: '<data>' })
    let state = ethereumReducer(void 0, actions.setEthereum(data))
    expect(state).to.equal(data)
  })

  it('should create a new account', () => {
    let next = ethereumReducer(state, actions.createAccount(masterSeed))
    expect(next.value).to.deep.equal({ ethereum: EthWallet.createAccount(masterSeed, ethWallet) })
  })

  it('should set has seen', () => {
    let next = ethereumReducer(state, actions.setHasSeen(true))
    expect(next.value).to.deep.equal({ ethereum: EthWallet.setHasSeen(true, ethWallet) })
  })

  it('should set last tx hash', () => {
    let next = ethereumReducer(state, actions.setLastTx('txhash'))
    expect(next.value).to.deep.equal({ ethereum: EthWallet.setLastTx('txhash', ethWallet) })
  })
})
