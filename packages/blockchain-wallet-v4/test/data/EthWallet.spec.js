import chai from 'chai'
import { compose } from 'ramda'
import Bitcoin from 'bitcoinjs-lib'
import { EthWallet, EthAccount } from '../../src/types/ethereum'
const { expect } = chai

describe('EthWallet', () => {
  const masterHex = '265c86692394fab95d0efc4385b89679d8daef5c9975e1f2b1f1eb4300bc10ad81d4d117c323591d543f6e54aa9d4560cad424bc66bb2bb61dc14285a508dad7'
  const masterHdNode = Bitcoin.HDNode.fromSeedBuffer(Buffer.from(masterHex, 'hex'))

  let ethWalletData = EthWallet.createAccount(
    masterHdNode,
    EthWallet.factory({
      has_seen: true,
      default_account_idx: 0,
      accounts: [],
      tx_notes: { 'asdf': 'my note' }
    })
  )

  describe('static', () => {
    it('should be given the correct defaults', () => {
      let ethWallet = EthWallet.factory()
      expect(ethWallet.defaultAccountIndex).to.equal(0)
      expect(ethWallet.accounts).to.deep.equal([])
    })
  })

  describe('getters', () => {
    it('should have: defaultAccountIndex', () => {
      expect(ethWalletData.defaultAccountIndex).to.equal(0)
    })

    it('should have: defaultAccount', () => {
      let expected = ethWalletData.accounts[ethWalletData.defaultAccountIndex]
      expect(EthWallet.selectDefaultAccount(ethWalletData)).to.equal(expected)
    })

    it('should have: accounts', () => {
      expect(ethWalletData.accounts).to.be.an('Array')
    })

    it('should have: defaults', () => {
      expect(EthWallet.defaults).to.deep.equal({ GAS_PRICE: 21, GAS_LIMIT: 21000 })
    })
  })

  describe('getTxNote', () => {
    it('should get a note by hash', () => {
      let note = EthWallet.getTxNote('asdf', ethWalletData)
      expect(note.isJust).to.equal(true)
      expect(note.value).to.equal('my note')
    })

    it('should return nothing if there is no note', () => {
      let note = EthWallet.getTxNote('qwer', ethWalletData)
      expect(note.isNothing).to.equal(true)
    })
  })

  describe('setTxNote', () => {
    it('should set a note by hash', () => {
      let ethWallet = EthWallet.setTxNote('qwer', 'new note', ethWalletData)
      expect(EthWallet.getTxNote('qwer', ethWallet).get()).to.equal('new note')
    })

    it('should delete a note if the value is null', () => {
      let ethWallet = EthWallet.setTxNote('asdf', null, ethWalletData)
      expect(EthWallet.getTxNote('asdf', ethWallet).isNothing).to.equal(true)
    })

    it('should delete a note if the value is an empty string', () => {
      let ethWallet = EthWallet.setTxNote('asdf', '', ethWalletData)
      expect(EthWallet.getTxNote('asdf', ethWallet).isNothing).to.equal(true)
    })

    it('should do nothing if note is not of type string', () => {
      let ethWallet = EthWallet.setTxNote('asdf', 3, ethWalletData)
      expect(ethWallet).to.deep.equal(ethWalletData)
    })
  })

  describe('generateAccount', () => {
    it('should derive a new account', () => {
      let account = EthWallet.generateAccount(masterHdNode, 0)
      expect(account).to.deep.equal(EthAccount.factory({
        priv: undefined,
        addr: '0x5532f8B7d3f80b9a0892a6f5F665a77358544acD',
        label: undefined,
        archived: false,
        correct: true
      }))
    })
  })

  describe('createAccount', () => {
    it('should insert a new account in eth wallet', () => {
      let ethWallet = EthWallet.createAccount(masterHdNode, ethWalletData)
      expect(ethWallet.accounts.length).to.equal(2)
      expect(ethWallet.accounts[1]).to.deep.equal(EthAccount.factory({
        priv: undefined,
        addr: '0x91C29C839c8d2B01f249e64DAB3B70DDdE896277',
        label: 'My Ether Wallet 2',
        archived: false,
        correct: true
      }))
    })

    it('should create multiple new accounts', () => {
      let create = EthWallet.createAccount(masterHdNode)
      let ethWallet = create(create(ethWalletData))
      let account = EthWallet.selectAccount(1, ethWallet)
      expect(account.label).to.equal('My Ether Wallet 2')
    })
  })

  describe('.getPrivateKeyForAccount', () => {
    const correctKey = '19ee4f0ce2f780022b4bb14f489e5c9feb281d24d26a68d576851437b941a596'
    it('should get the correct private key', () => {
      let priv = EthWallet.getPrivateKeyForAccount(masterHdNode, ethWalletData)
      expect(priv.isRight).to.equal(true)
      expect(priv.get().toString('hex')).to.equal(correctKey)
    })
  })

  describe('.getPrivateKeyForLegacyAccount', () => {
    const seedHex = '17eb336a2a3bc73dd4d8bd304830fe32'
    const legacyKey = '5f72fb06a622711c6480e4fea91993eed4bb7b5834da35033a0400261528185e'
    let ethWallet

    beforeEach(() => {
      let addr = EthAccount.privateKeyToAddress('0x' + legacyKey).get()
      let legacyAccount = EthAccount.factory({ addr })
      ethWallet = EthWallet.setLegacyAccount(legacyAccount, ethWalletData)
    })

    it('should get the correct private key', () => {
      let priv = EthWallet.getPrivateKeyForLegacyAccount(seedHex, ethWallet)
      expect(priv.isRight).to.equal(true)
      expect(priv.get().toString('hex')).to.equal(legacyKey)
    })

    it('should fail if there is no legacy account', () => {
      let priv = EthWallet.getPrivateKeyForLegacyAccount(seedHex, ethWalletData)
      expect(priv.isLeft).to.equal(true)
    })
  })

  describe('.toJSON', () => {
    it('should serialize to json', () => {
      let ethWallet = compose(
        EthWallet.createAccount(masterHdNode),
        EthWallet.setHasSeen(false),
        EthWallet.setDefaultAccountIndex(1),
        EthWallet.setTxNote('asdf', ''),
        EthWallet.setTxNote('<hash>', 'my note')
      )(ethWalletData)
      let json = JSON.stringify(EthWallet.toJSON(ethWallet))
      expect(json).to.equal('{"has_seen":false,"default_account_idx":1,"accounts":[{"label":"My Ether Wallet","archived":false,"correct":true,"addr":"0x5532f8B7d3f80b9a0892a6f5F665a77358544acD"},{"label":"My Ether Wallet 2","archived":false,"correct":true,"addr":"0x91C29C839c8d2B01f249e64DAB3B70DDdE896277"}],"tx_notes":{"<hash>":"my note"},"last_tx":null}')
    })
  })
})
