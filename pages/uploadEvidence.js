import React, { useState, useEffect } from 'react'
import web3Connect from '../lib/web3Connect'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
const { create } = require('ipfs-http-client')
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'http',
})

export default function uploadEvidence() {
  const [contractInfo, setContractInfo] = useState({
    contractAddress: '',
  })

  const [userAccount, setUserAccount] = useState(0x0)

  const [evidenceImage, setEvidenceImage] = useState()

  const [evidenceImageBuffer, setEvidenceImageBuffer] = useState()

  const [evidenceImagePreview, setEvidenceImagePreview] = useState(
    '/images/illustration.jpg',
  )

  const [displayMessage, setDisplayMessage] = useState("Loading")

  const [caseInfo, setCaseInfo] = useState({
    caseNo: '',
    ipfsHash: '',
  })

  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(false)


  const handleChange = (e) => {
    const value = e.target.value
    setCaseInfo({
      ...caseInfo,
      [e.target.name]: value,
    })
  }

  const setImageInfo = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      const bufferData = Buffer(reader.result)
      console.log(bufferData)
      //const base64String = btoa(String.fromCharCode(...new Uint8Array(bufferData)));
      //base64String = `data:image/png;base64${base64String}`
      // console.log(base64String)
      setEvidenceImageBuffer(bufferData)
    }
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

  //https://ipfs.infura.io/ipfs/QmYByKqyRkB34yPMqU4Uinq5jkgpWj23msShoQdZs2aUu6
  const uploadEvidence = (e) => {
    setLoading(true)
    e.preventDefault()
    console.log('Uploading to IPFS..')
    let data = evidenceImageBuffer
    console.log('image data: ', data)
    if (data) {
      try {
        const result = ipfs.add(data).then((result) => {
          console.log('ipfs result: ', result.path)

        })
      } catch (e) {
        console.log('Error: ', e)
      }
    } else {
      alert('No files submitted. Please try again.')
      console.log('ERROR: No data to submit')
    }
    setTimeout(function() {
      //your code to be executed after 1 second
      setDisplayMessage("Uploading to IPFS...")
      setLoading(false)
    }, 1000);

    setTimeout(function() {
      //your code to be executed after 1 second
      setDisplayMessage("Writing to Blockchain...")
      setLoading(false)
    }, 2000);
    
  }

  let content
  if (loading) {
    content = (
      <div
        id="loading-screen"
        className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex flex-col justify-center items-center"
      >
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="pt-6 text-black">{displayMessage}</p>
      </div>
    )
  } else if (isResponse) {
    content = (
      <div
        id="loading-screen"
        className=" w-full h-full fixed top-0 left-0 bg-white opacity-70 z-50 flex flex-col justify-center items-center"
      >
        <p className="pt-6 text-black font-bold text-3xl text-green-400">
          Case Created!
        </p>
        <p className="pt-6 text-black">Case Id: 55rwerwr345353</p>
        <a
          href="https://etherscan.io/tx/0x4bf652c1811815fe3e9f3d7e4ddaecd9aed85c00f3dd26f130f826c8d698ebb9"
          target="_blank"
        >
          <p className="pt-6 text-black animate-pulse text-red-600">
            View on Etherscan
          </p>
        </a>
      </div>
    )
  } else {
    content = (
      <div>
        <div className="mx-auto font-extrabold text-4xl py-6 flex justify-center">
          <p>Upload Evidence</p>
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
            <Image
              className="rounded-lg"
              src={evidenceImagePreview}
              width={700}
              height={350}
            />
            <div className="flex flex-col">
              <label>Select the Evidence Image:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="file"
                name="evidenceImage"
                value={evidenceImage}
                onChange={(e) => setImageInfo(e)}
              />
            </div>

            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className=" bg-gray-600  px-4 py-2 rounded hover:bg-black text-white block"
                onClick={(e) => uploadEvidence(e)}
              >
                Upload{' '}
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
