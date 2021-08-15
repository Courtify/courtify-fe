import Web3 from 'web3'
import Courtify from '../contracts/abi/Courtify.json'

const getWeb3 = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
    return window.web3
  } catch (error) {
    throw 'Non-Ethereum browser detected. You should consider trying MetaMask!'
  }
}

const getContractInstance = async (web3, contractData) => {
  const networkId = await web3.eth.net.getId()
  const deployedAddress = contractData.networks[networkId].address

  // create the instance
  const instance = new web3.eth.Contract(contractData.abi, deployedAddress)
  return instance
}

const web3Connect = async () => {
  try {
    const web3 = await getWeb3()
    const accounts = await web3.eth.getAccounts()
    const contract = await getContractInstance(web3, Courtify)

    return [web3, accounts, contract]
  } catch (error) {
    throw 'Failed to load web3, accounts, or contract. Check console for details.'
  }
}

const test = async () => {
  let caseInfo = await courtifyContract.methods.getCase(1).call()
  console.log(caseInfo)
  /* .on('receipt', function(receipt){
        // receipt example
        let caseId = receipt.events.CaseCreated.returnValues._caseID
        console.log("caseId:", caseId);
      })*/
}

export default web3Connect
