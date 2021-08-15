import Web3 from 'web3'
import Courtify from '../contracts/abi/Courtify.json'

const web3Connect = async () => {
  await loadWeb3()
  await loadBloackchainData()
}
const loadWeb3 = async () => {
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
}

const loadBloackchainData = async () => {
  const web3 = window.web3

  const accounts = await web3.eth.getAccounts()
  //current account
  console.log(accounts[0])
  const networkId = await web3.eth.net.getId()
  console.log(networkId)

  const CourtifyInfo = Courtify.networks[networkId]
  if (CourtifyInfo) {
    const courtifyContract = new web3.eth.Contract(
      Courtify.abi,
      CourtifyInfo.address,
    )
    //console.log("Contract : ",courtifyContract)
    return courtifyContract
  } else {
    throw 'Contract not found on this network'
  }
}

export default web3Connect
