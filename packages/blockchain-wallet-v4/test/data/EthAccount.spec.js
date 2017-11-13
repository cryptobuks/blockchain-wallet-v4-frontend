import chai from 'chai'
import { EthAccount } from '../../src/types/ethereum'
const { expect } = chai

describe('EthAccount', () => {
  describe('privateKeyToAddress', () => {
    let data = {
      addr: '0xb5eE603A7dE95FD350423a38fA78a06BBf583A3c',
      priv: Buffer.from('613bff4f0df53cbe51970f631395857a73facef7ca0812567373dbb513e8a839', 'hex')
    }

    it('should produce the correct address', () => {
      let eitherAddr = EthAccount.privateKeyToAddress(data.priv)
      expect(eitherAddr.isRight).to.equal(true)
      expect(eitherAddr.value).to.equal(data.addr)
    })

    it('should fail when given a non-address', () => {
      let eitherAddr = EthAccount.privateKeyToAddress('asdfasdf')
      expect(eitherAddr.isLeft).to.equal(true)
      expect(eitherAddr.value.message).to.equal('private key length is invalid')
    })
  })

  describe('defaultLabel', () => {
    it('should return the correct label for the 0th account', () => {
      expect(EthAccount.defaultLabel(0)).to.equal('My Ether Wallet')
    })

    it('should return the correct label for the nth account', () => {
      expect(EthAccount.defaultLabel(1)).to.equal('My Ether Wallet 2')
    })
  })
})
