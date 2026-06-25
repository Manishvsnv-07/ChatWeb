import Link from 'next/link'
import React from 'react'
import Main from './Home-Components/Main'
import Footer from './Home-Components/Footer'

const page = async () => {

  return (
    <div className="main bg-[url(/imgs/main.png)] bg-cover bg-center h-screen w-full flex flex-col">
      <Main/>
      <Footer/>
    </div>
  )
}

export default page