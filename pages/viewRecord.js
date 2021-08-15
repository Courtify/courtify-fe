import React, { useState } from 'react'
import fetchRecord from '../lib/fetchRecord'
import Header from '../components/Header'
import Image from 'next/image'

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
  const [evidenceArray, setEvidenceArray] = useState([])
  const [loading, setLoading] = useState(false)
  const [isResponse, setIsResponse] = useState(false)
  const [imageList, setImageList] = useState()

  const timestampToDate = (timestamp) => {
    var date = new Date(timestamp)
    var todate = new Date(date).getDate()
    var tomonth = new Date(date).getMonth() + 1
    var toyear = new Date(date).getFullYear()
    date = todate + '/' + tomonth + '/' + toyear
    return date
  }

  const setImages = (evidenceDeatils) => {
    let i=1
    var url = 'https://ipfs.infura.io/ipfs/'
    const listItems = evidenceDeatils.map((hash,index) => (
      <div key={index} className="py-10">
      <p>Evidence {index + 1} :</p>
      <Image
        src={url.concat(hash)}
        width={700}
        height={350}
      />
      </div>
    ))
    setImageList(listItems)
  }
  const veiwDetails = async (e) => {
    setLoading(true)
    setDisplayMessage('Please wait while fetching data...')
    e.preventDefault()
    try {
      const [caseDeatils, evidenceDeatils] = await fetchRecord(caseId)
      var caseDate = timestampToDate(Number(caseDeatils._timestamp))
      setCaseInfo({
        date: caseDate,
        state: caseDeatils._state,
        district: caseDeatils._district,
        court: caseDeatils._court,
        name: caseDeatils._name,
        caseType: caseDeatils._caseType,
      })

      setImages(evidenceDeatils)

      setLoading(false)
      setIsResponse(true)
    } catch (error) {
      console.log(error)
      alert('Failed to fetch data')
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
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                Case Number: {caseId}{' '}
              </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                Date: {caseInfo.date}{' '}
              </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                State: {caseInfo.state}{' '}
              </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                District: {caseInfo.district}
              </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                Petitioner: {caseInfo.name}
              </p>
              <p className="bg-white border border-gray-300 rounded-lg py-2 px-4 mb-4">
                {' '}
                Type: {caseInfo.caseType}
              </p>

              {imageList}

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
                onChange={(e) => {
                  setCaseId(e.target.value)
                }}
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
