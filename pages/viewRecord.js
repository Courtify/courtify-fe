import React, { useState } from 'react'
import web3Connect from '../lib/web3Connect'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
const { create } = require('ipfs-http-client')


export default function uploadEvidence() {
  const [contractInfo, setContractInfo] = useState({
    contractAddress: '',
  })

  const [userAccount, setUserAccount] = useState(0x0)

  const [evidenceImage, setEvidenceImage] = useState()

  const [caseInfo, setCaseInfo] = useState({
    caseNo: '',
    evidenceImage: '',
    ipfsHash: '',
  })

  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(true)

  const handleChange = (e) => {
    const value = e.target.value
    setCaseInfo({
      ...caseInfo,
      [e.target.name]: value,
    })
  }


  const checkConnection = async () => {
    try {
      const web3Status = await web3Connect()
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.log(error)
    }
  }

  const createNewRecord = (e) => {
    e.preventDefault()
    console.log('create')
    //createNewCase(caseInfo.date, caseInfo.state, caseInfo.district, caseInfo.petitioner, caseInfo.caseType );
  }

  let content
  if (loading) {
    content = (
      <div
        id="loading-screen"
        className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex flex-col justify-center items-center"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="pt-6 text-black">Please Wait While Fetching Records...</p>
      </div>
    )
  } else if (isResponse) {
    content = (
      <div>
        <div className="mx-auto font-extrabold text-4xl py-6 flex justify-center">
          <p>View Records</p>
        </div>
        <div className="bg-gray-200  w-3/4  lg:max-w-2xl mx-auto rounded-lg">
          <form className="h-full flex flex-col flex-wrap justify-evenly  text-black font-mono font-bold px-10 py-10">
            <div className="flex flex-col">
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Case Number: 424242 </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Date: 424242 </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">  State: 424242 </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> District: 424242 </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Petitioner: 424242 </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Type: 424242 </p>
              <Image
              className="rounded-lg"
              src="https://ipfs.infura.io/ipfs/QmYByKqyRkB34yPMqU4Uinq5jkgpWj23msShoQdZs2aUu6"
              width={700}
              height={350}
            />
            </div>

            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className=" bg-gray-600  px-4 py-2 rounded hover:bg-black text-white block"
                onClick={(e) => uploadEvidence(e)}
              >
                View Another{' '}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    content = (
      <div>
        <div className="mx-auto font-extrabold text-4xl py-6 flex justify-center">
          <p>View Records</p>
        </div>
        <div className="bg-gray-200  w-3/4  lg:max-w-2xl mx-auto rounded-lg">
          <form className="h-full flex flex-col flex-wrap justify-evenly  text-black font-mono font-bold px-10 py-10">
            <div className="flex flex-col">
              <label> Case Number: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the Case Number"
                name="caseNo"
                value={caseInfo.caseNo}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className=" bg-gray-600  px-4 py-2 rounded hover:bg-black text-white block"
                onClick={(e) => uploadEvidence(e)}
              >
                View Details{' '}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div className="h-screen">
      <Header />
      {content}
    </div>
  )
}
