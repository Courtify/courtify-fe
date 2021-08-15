import web3Connect from './web3Connect'

const fetchEvidence = async (caseId) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let [web3, accounts, contract] = await web3Connect()
      let userAddress = accounts[0]

      let evidenceInfo = await contract.methods
        .getEvidence(caseId)
        .call({ from: userAddress })

      console.log(evidenceInfo)
      resolve(evidenceInfo)
    } catch (error) {
      reject(error)
    }
  })

  let result = await promise

  return result
}

export default fetchEvidence
