import { __, identity, is, compose, curry, assoc, dissoc, append, prop, over, set, lensProp, lensPath } from 'ramda'
import EthHd from 'ethereumjs-wallet/hdkey'
import Either from 'data.either'
import Maybe from 'data.maybe'
import * as EthAccount from './EthAccount'

export const factory = (obj = {}) => ({
  has_seen: obj.has_seen,
  default_account_idx: obj.default_account_idx || 0,
  accounts: (obj.accounts || []).map(EthAccount.factory),
  tx_notes: obj.tx_notes || {},
  last_tx: obj.last_tx || null,
  legacy_account: obj.legacy_account ? EthAccount.factory(obj.legacy_account) : void 0
})

export const defaults = {
  GAS_PRICE: 21,
  GAS_LIMIT: 21000
}

export const selectAccount = curry((index, ethWallet) =>
  ethWallet.accounts[index]
)

export const selectDefaultAccount = (ethWallet) => (
  selectAccount(ethWallet.default_account_idx, ethWallet)
)

export const overAccount = curry((f, index, ethWallet) =>
  over(lensPath(['accounts', index]), f, ethWallet)
)

export const setHasSeen = assoc('has_seen')
export const setDefaultAccountIndex = assoc('default_account_idx')
export const setLegacyAccount = assoc('legacy_account')
export const selectLegacyAccount = prop('legacy_account')

export const getTxNote = curry((hash, ethWallet) =>
  Maybe.fromNullable(ethWallet.tx_notes[hash])
)

export const setTxNote = curry((hash, note, ethWallet) => {
  let overNotes = over(lensProp('tx_notes'), __, ethWallet)
  if (note === null || note === '') {
    return overNotes(dissoc(hash))
  } else if (is(String, note)) {
    return overNotes(assoc(hash, note))
  } else {
    return overNotes(identity)
  }
})

export const archiveAccount = curry((ethWallet, index) =>
  index === ethWallet.default_account_idx
    ? Either.Left(new Error('Cannot archive default account'))
    : Either.of(ethWallet).map(overAccount(EthAccount.unarchive, index))
)

export const unarchiveAccount = curry((ethWallet, accountIndex) =>
  over(lensPath(['accounts', accountIndex]), EthAccount.unarchive, ethWallet)
)

export const createAccount = curry((masterHdNode, ethWallet) => {
  let account = EthAccount.setLabel(
    EthAccount.defaultLabel(ethWallet.accounts.length),
    generateAccount(masterHdNode, ethWallet.accounts.length)
  )
  return over(lensProp('accounts'), append(account), ethWallet)
})

export const deriveChild = (masterHdNode, index) => {
  let accountNode = masterHdNode
    .deriveHardened(44)
    .deriveHardened(60)
    .deriveHardened(0)
    .derive(0)
    .derive(index)
  return EthHd.fromExtendedKey(accountNode.toBase58())
}

export const generateAccount = compose(
  EthAccount.markAsCorrect,
  EthAccount.fromWallet,
  node => node.getWallet(),
  deriveChild
)

export const getPrivateKeyForAccount = curry((masterHdNode, ethWallet) => {
  let privateKey = deriveChild(masterHdNode, ethWallet.default_account_idx).getWallet().getPrivateKey()
  return EthAccount.isCorrectPrivateKey(privateKey, selectDefaultAccount(ethWallet))
    ? Either.Right(privateKey)
    : Either.Left(new Error('Failed to derive correct private key'))
})

/* start legacy */

const DERIVATION_PATH = "m/44'/60'/0'/0"

export const getPrivateKeyForLegacyAccount = curry((seedHex, ethWallet) =>
  Either.fromNullable(selectLegacyAccount(ethWallet)).leftMap(
    () => new Error('Wallet does not contain a beta account')
  ).chain((legacyAccount) => {
    let privateKey = deriveChildLegacy(seedHex, 0).getWallet().getPrivateKey()
    return EthAccount.isCorrectPrivateKey(privateKey, legacyAccount)
      ? Either.Right(privateKey)
      : Either.Left(new Error('Failed to derive correct private key'))
  })
)

export const deriveChildLegacy = curry((seedHex, index) =>
  EthHd.fromMasterSeed(seedHex).derivePath(DERIVATION_PATH).deriveChild(index)
)

export const transitionFromLegacy = (ethWallet) => {
  let defaultAccount = selectDefaultAccount(ethWallet)
  let transition = compose(
    setLegacyAccount(defaultAccount),
    set(lensProp('accounts'), [])
  )
  return defaultAccount && !defaultAccount.isCorrect
    ? transition(ethWallet)
    : ethWallet
}

/* end legacy */
