import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image'
import Link from 'next/link'
import Web3 from 'web3'
import React, { useState, useEffect } from 'react'

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [contractAddress, setContractAddress] = useState(0x0)
  const [userAccount, setUserAccount] = useState(0x0)

  let content
  if (loading) {
    content = (
      <div
        id="loading-screen"
        className=" w-full h-full fixed top-0 left-0 bg-white opacity-75 z-50 flex justify-center items-center"
      >
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    )
  } else {
    content = (
      <div className="h-screen">
        <Header />

        <div className="bg-white w-2/3 lg:max-w-6xl mx-auto my-8 rounded-lg flex flex-col justify-between items-center">
          <p className=" text-gray-600 font-extrabold text-5xl py-6">
            Courtify
          </p>

          <div className="rounded-lg">
            <Image
              className="rounded-lg"
              src="/images/illustration.jpg"
              width={700}
              height={350}
            />
          </div>

          <div className="w-2/3 flex justify-evenly py-4 ">
            <div className="">
              <Link href="/createRecord">
                <button
                  type="button"
                  className=" bg-gray-600  px-8 py-2 rounded hover:bg-black text-white block"
                >
                  Create{' '}
                </button>
              </Link>
            </div>
            <div className="">
              <Link href="/uploadEvidence">
                <button
                  type="button"
                  className=" bg-gray-600  px-8 py-2 rounded hover:bg-black text-white block"
                >
                  Upload{' '}
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div class=" flex justify-center items-center">
          <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Head>
        <title>Courtify</title>
        <meta name="description" content="Court evidence storage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {content}
    </div>
  )
}
