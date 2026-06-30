import Link from 'next/link'
import React from 'react'
import Main from './Home-Components/Main'
import Footer from './Home-Components/Footer'
import Image from 'next/image'

const page = async () => {

  return (
    <div className="main relative h-dvh w-full flex flex-col">
      <Image
        src="/imgs/main.webp"
        alt=""
        fill
        priority = {true}
        quality={75}
        sizes="100vw"
        className="object-cover -z-10"
      />
      <Main />
      <Footer />
    </div>
  )
}

export default page
