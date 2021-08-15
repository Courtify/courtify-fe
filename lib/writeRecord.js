import web3Connect from './web3Connect'

const writeRecord = async (
  date,
  state,
  district,
  court,
  petitionerId,
  petitionerName,
  caseType,
) => {
  let promise = new Promise(async(resolve, reject) => {
  try {
  let [web3, accounts, contract] = await web3Connect()
  let userAddress = accounts[0]
  //console.log(web3, accounts, contract)
  var timestamp = date
  timestamp = Date.parse(timestamp)

  contract.methods
    .createNewCase(
      timestamp,
      state,
      district,
      court,
      petitionerId,
      petitionerName,
      caseType,
    )
    .send({ from: userAddress })
    .on('receipt', function (receipt) {
      let caseId = receipt.events.CaseCreated.returnValues._caseID
      console.log('caseId:', caseId)
      resolve(caseId)
    })
  }catch (error) {
    reject(error)
  }
});

  let result = await promise;
  return result

}

export default writeRecord
