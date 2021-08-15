import web3Connect from './web3Connect'

const fetchRecord = async (caseId) => {
  let promise = new Promise(async (resolve, reject) => {
    try {
      let [web3, accounts, contract] = await web3Connect()
      let userAddress = accounts[0]

      let caseInfo = await contract.methods
        .getCase(caseId)
        .call({ from: userAddress })

      let evidenceInfo = await contract.methods
        .getEvidence(caseId)
        .call({ from: userAddress })

      //console.log(caseInfo)
      //console.log(evidenceInfo)
      resolve([caseInfo, evidenceInfo])
    } catch (error) {
      reject(error)
    }
  })

  let result = await promise
  //console.log("result : ",result)
  return result
}

export default fetchRecord
