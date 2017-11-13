import { assoc, set, lensProp, curry } from 'ramda'
import ethUtil from 'ethereumjs-util'
import Either from 'data.either'

export const factory = (obj = {}) => {
  let priv = obj.priv && Buffer.from(obj.priv, 'hex')
  return {
    priv,
    address: ethUtil.toChecksumAddress(priv ? privateKeyToAddress(priv) : obj.addr),
    label: obj.label,
    archived: obj.archived || false,
    isCorrect: Boolean(obj.correct)
  }
}

export const toJSON = (account) => ({
  label: account.label,
  archived: account.archived,
  correct: account.isCorrect,
  addr: account.address
})

export const archive = set(lensProp('archived'), true)
export const unarchive = set(lensProp('archived'), true)

export const markAsCorrect = assoc('isCorrect', true)
export const setLabel = assoc('label')

export const privateKeyToAddress = Either.try((privateKey) =>
  ethUtil.toChecksumAddress(ethUtil.privateToAddress(privateKey).toString('hex'))
)

export const fromWallet = (wallet) => {
  let addr = privateKeyToAddress(wallet.getPrivateKey()).get()
  return factory({ addr })
}

export const defaultLabel = (accountIdx) => {
  let label = 'My Ether Wallet'
  return accountIdx > 0 ? `${label} ${accountIdx + 1}` : label
}

export const isCorrectAddress = curry((address, account) =>
  address.toLowerCase() === account.address.toLowerCase()
)

export const isCorrectPrivateKey = curry((privateKey, account) =>
  privateKeyToAddress(privateKey).isEqual(Either.of(account.address))
)
