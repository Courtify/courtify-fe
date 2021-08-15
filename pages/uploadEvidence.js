import React, { useState, useEffect } from 'react'
import web3Connect from '../lib/web3Connect'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
import writeEvidence from '../lib/writeEvidence'
const { create } = require('ipfs-http-client')
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'http',
})

export default function uploadEvidence() {

  const [evidenceImage, setEvidenceImage] = useState()

  const [evidenceImageBuffer, setEvidenceImageBuffer] = useState()

  const [evidenceImagePreview, setEvidenceImagePreview] = useState(
    '/images/illustration.jpg',
  )

  const [displayMessage, setDisplayMessage] = useState()
  const [caseId, setCaseId] = useState()
  const [txHash, setTxHash] = useState()
  const [etherScanLink, setEtherScanLink] = useState()
  const [imageHash, setImageHash] = useState()
  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(false)



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

  
  //https://ipfs.infura.io/ipfs/QmYByKqyRkB34yPMqU4Uinq5jkgpWj23msShoQdZs2aUu6
  const uploadEvidence = async(e) => {
    setDisplayMessage("Uploading to IPFS..")
    setLoading(true)
    e.preventDefault()
    console.log('Uploading to IPFS..')
    let data = evidenceImageBuffer
    //console.log('image data: ', data)
    if (data) {
      try {
        console.log(data)
        const result = await ipfs.add(data).then(async(result) => {
          console.log('ipfs result: ', result.path)
          const ipfsHash = result.path
          setDisplayMessage("Uploaded to IPFS. Writing to Blockchain...")
          console.log("cId:",caseId)
          const txHash = await writeEvidence(caseId, ipfsHash)
          var url = "https://etherscan.io/tx/"
          url = url.concat(txHash) 
          //setTxHash(txHash)
          console.log('URL: ', url)
          setEtherScanLink(url)
          setLoading(false)
          setDisplayMessage("Upload Completed!")
          setIsResponse(true)
        })
      } catch (e) {
        console.log('Error: ', e)
        alert('Failed to submit Evidence')
      }
    } else {
      alert('No files submitted. Please try again.')
      console.log('ERROR: No data to submit')
    }
    
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
          {displayMessage}
        </p>
        <a
          href={etherScanLink}
          target="_blank"
        >
          <p className="pt-6 text-black animate-pulse text-red-600">
            View on Etherscan
          </p>
        </a>
        <div className="pt-6">
          <Link href="/uploadEvidence">
            <button
              type="button"
              onClick={()=>{setIsResponse(false); }}
              className=" bg-gray-600  px-8 py-2 rounded hover:bg-black text-white block"
            >
              Back{' '}
            </button>
          </Link>
        </div>
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
                placeholder="Enter the Case ID"
                name="caseId"
                value={caseId}
                onChange={(e) => {setCaseId(e.target.value)}}
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
