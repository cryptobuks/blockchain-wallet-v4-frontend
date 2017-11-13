
export default ({ rootUrl, apiUrl, get, post }) => {
  const checkContract = (address) => ({
    url: apiUrl,
    endPoint: `eth/account/${address}/isContract`
  })

  const getEthereumBalances = (context) => get({
    url: apiUrl,
    endPoint: `eth/account/${context.join(',')}/balance`
  })

  const getEthereumData = (context) => get({
    url: apiUrl,
    endPoint: `eth/account/${context.join(',')}`
  })

  const getEthereumFee = () => get({
    url: apiUrl,
    endPoint: 'eth/fees'
  })

  const getEthereumLatestBlock = () => get({
    url: apiUrl,
    endPoint: 'eth/latestblock'
  })

  const getEthereumTicker = () => get({
    url: rootUrl,
    endPoint: 'ticker',
    data: { format: 'json', currency: 'USD', base: 'ETH' }
  })

  const getEthereumTransaction = (hash) => get({
    url: apiUrl,
    endPoint: `eth/tx/${hash}`
  })

  const pushEthereumTx = (rawTx) => post({
    url: apiUrl,
    endPoint: 'eth/pushtx',
    contentType: 'application/json',
    data: JSON.stringify({ rawTx })
  })

  return {
    checkContract,
    getEthereumBalances,
    getEthereumData,
    getEthereumFee,
    getEthereumLatestBlock,
    getEthereumTicker,
    getEthereumTransaction,
    pushEthereumTx
  }
}
