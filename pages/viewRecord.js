import React, { useState } from 'react'
import fetchRecord from '../lib/fetchRecord'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
import fetchEvidence from '../lib/fetchEvidence'
const { create } = require('ipfs-http-client')


export default function uploadEvidence() {

  const [displayMessage, setDisplayMessage] = useState()
  const [caseId, setCaseId] = useState()
  const [caseInfo, setCaseInfo] = useState({
    date: '',
    state: '',
    district: '',
    court: '',
    name: '',
    caseType: '',
  })
  const [evidenceArray, setEvidenceArray] = useState([]);
  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(false)


  const timestampToDate = (timestamp) =>{
    console.log(timestamp)
    var date = new Date(timestamp);
    var todate=new Date(date).getDate();
    var tomonth=new Date(date).getMonth()+1;
    var toyear=new Date(date).getFullYear();
    date =tomonth+'/'+todate+'/'+toyear;
    console.log(date)
    return date
  }

  const veiwDetails = async(e) => {
    setLoading(true)
    setDisplayMessage('Please wait while fetching data...')
    e.preventDefault()
    try {
      const caseDeatils = await fetchRecord(caseId)
      console.log(caseDeatils._timestamp)
      var caseDate = timestampToDate(Number(caseDeatils._timestamp))
     // var date = new Date(Number(caseDeatils._timestamp)).toLocaleDateString("en-US")
      setCaseInfo({
        date: caseDate,
        state: caseDeatils._state,
        district: caseDeatils._district,
        court: caseDeatils._court,
        name: caseDeatils.name,
        caseType: caseDeatils._caseType,
      })


      var evidenceDetails = await fetchEvidence(caseId)
      //setEvidenceArray(evidenceDetails)
      console.log(evidenceDeatils)
      setLoading(false)
      setIsResponse(true)
    } catch (error) {
      console.log(error)
      alert("Failed to fetch data")
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
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Case Number: {caseId} </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Date: {caseInfo.date} </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">  State:  {caseInfo.state} </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> District: {caseInfo.district}</p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Petitioner: {caseInfo.name}</p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4"> Type: {caseInfo.caseType}</p>
              
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
                placeholder="Enter the Case ID"
                name="caseId"
                value={caseId}
                onChange={(e) => {setCaseId(e.target.value)}}
              />
            </div>

            <div className="flex flex-wrap justify-center">
              <button
                type="submit"
                className=" bg-gray-600  px-4 py-2 rounded hover:bg-black text-white block"
                onClick={(e) => veiwDetails(e)}
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
