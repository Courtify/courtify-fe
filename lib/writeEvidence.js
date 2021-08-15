import web3Connect from './web3Connect'

const writeEvidence = async (caseId, ipfsHash) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let [web3, accounts, contract] = await web3Connect()
      let userAddress = accounts[0]

      contract.methods
        .uploadEvidence(caseId, ipfsHash)
        .send({ from: userAddress })
        .on('receipt', function (receipt) {
          let txHash = receipt.transactionHash
          console.log('Transactin hash:', txHash)
          resolve(txHash)
        })
    } catch (error) {
      reject(error)
    }
  })

  let result = await promise

  return result
}

export default writeEvidence
