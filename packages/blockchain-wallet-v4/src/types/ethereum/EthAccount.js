import { assoc, set, lensProp, curry } from 'ramda'
import ethUtil from 'ethereumjs-util'
import Either from 'data.either'

export const factory = (obj = {}) => ({
  label: obj.label,
  archived: obj.archived || false,
  correct: Boolean(obj.correct),
  addr: ethUtil.toChecksumAddress(obj.addr)
})

export const archive = set(lensProp('archived'), true)
export const unarchive = set(lensProp('archived'), true)

export const markAsCorrect = assoc('correct', true)
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
  address.toLowerCase() === account.addr.toLowerCase()
)

export const isCorrectPrivateKey = curry((privateKey, account) =>
  privateKeyToAddress(privateKey).isEqual(Either.of(account.addr))
)
