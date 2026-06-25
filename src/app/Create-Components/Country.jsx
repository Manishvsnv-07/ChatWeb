'use client'
import React, { useState } from 'react'
import { countries } from '@/utils/countries'

const Country = ({country,CountryCode}) => {

  const [open, setopen] = useState(false)
  const [Selected, setSelected] = useState('Select Country')
  const [code, setcode] = useState('')
  return (
    <div>
      <div  onClick={() => {
        setopen(!open)
      }} className='w-full flex items-center justify-center gap-3 bg-white'>
      {code?(<img src={`https://flagcdn.com/w40/${code}.png`} className='w-7 h-7 rounded-full' alt="" />):(null)}
      <button className='p-2'>{Selected}</button>
      </div>


      {open ? (<ul className='flex flex-col gap-3'>
        {countries.map((c, idx) => (
          <li onClick={() => {
            setSelected(c.name)
            CountryCode(c.code)
            country(c.name)
            setopen(false)
            setcode(c.code)
          }} className='flex gap-2 w-full items-center'>
            
            <img src={`https://flagcdn.com/w40/${c.code}.png`} className='w-7 h-7 rounded-full' alt="" />
            <h1 id={idx} className='w-full p-2 border border-black text-black'>{c.name}</h1></li>
        ))}
      </ul>) : (null)}

    </div>
  )
}

export default Country