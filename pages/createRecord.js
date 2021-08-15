import React, { useState } from 'react'
import Header from '../components/Header'
import writeRecord from '../lib/writeRecord'
import Link from 'next/link'
export default function createRecord() {
  const [displayMessage, setDisplayMessage] = useState()

  const [caseId, setCaseId] = useState()

  const [caseInfo, setCaseInfo] = useState({
    date: '',
    state: '',
    district: '',
    court: '',
    petitionerId: '',
    name: '',
    caseType: '',
    caseNo: '',
  })

  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(false)
  const [transactionLink, setTransactionLink] = useState()

  const handleChange = (e) => {
    const value = e.target.value
    setCaseInfo({
      ...caseInfo,
      [e.target.name]: value,
    })
  }

 
  const createNewRecord = async (e) => {
    setLoading(true)
    setDisplayMessage('Waiting for confirmation...')
    e.preventDefault()
    try {
      const [caseId, txHash ] = await writeRecord(
        caseInfo.date,
        caseInfo.state,
        caseInfo.district,
        caseInfo.court,
        caseInfo.petitionerId,
        caseInfo.name,
        caseInfo.caseType,
      )
      setCaseId(caseId)
      var url = "https://mumbai.polygonscan.com/tx/"
      url = url.concat(txHash) 
      setTransactionLink(url)
      setLoading(false)
      setIsResponse(true)
    } catch (error) {
      console.log(error)
      alert("Failed to create case")
    }
    setLoading(false)
  }

  let content
  if (loading) {
    content = (
      <div
        id="loading-screen"
        className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex flex-col justify-center items-center"
      >
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
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
        <p className="pt-6 text-black">Case Id: {caseId}</p>
        <a
          href={transactionLink}
          target="_blank"
        >
          <p className="pt-6 text-black animate-pulse text-red-600">
          View Transaction
          </p>
        </a>

        <div className="pt-6">
          <Link href="/uploadEvidence">
            <button
              type="button"
              className=" bg-gray-600  px-8 py-2 rounded hover:bg-black text-white block"
            >
              Upload Evidence{' '}
            </button>
          </Link>
        </div>

        <div className="pt-6">
          <Link href="/createRecord">
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
          <p>Create</p>
        </div>
        <div className="bg-gray-200  w-3/4  lg:max-w-2xl mx-auto rounded-lg">
          <form  className="h-full flex flex-col flex-wrap justify-evenly  text-black font-mono font-bold px-10 py-10">
            <div className="flex flex-col">
              <label>Date:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="date"
                name="date"
                value={caseInfo.date}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>State:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the State"
                name="state"
                value={caseInfo.state}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>District: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the District"
                name="district"
                value={caseInfo.district}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Court: </label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the name of the Court"
                name="court"
                value={caseInfo.court}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Petitioner Id:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter '0' if your  are a new petitioner "
                name="petitionerId"
                value={caseInfo.petitionerId}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label>Name:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the name of the petitioner"
                name="name"
                value={caseInfo.name}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label>Type:</label>
              <input
                className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"
                type="text"
                placeholder="Enter the type of the case"
                name="caseType"
                value={caseInfo.caseType}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className=" bg-gray-600  px-4 py-2 rounded hover:bg-black text-white block"
                onClick={(e) => createNewRecord(e)}
              >
                Create{' '}
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
