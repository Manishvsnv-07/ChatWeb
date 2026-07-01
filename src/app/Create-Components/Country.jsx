'use client'
import React, { useState, useRef, useEffect } from 'react'
import { countries } from '@/utils/countries'

const Country = ({ country, CountryCode }) => {

  const [open, setopen] = useState(false)
  const [Selected, setSelected] = useState('Select Country')
  const [code, setcode] = useState('')
  const wrapperRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setopen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={wrapperRef} className='relative w-full'>
      <div onClick={() => {
        setopen(!open)
      }} className='w-full flex items-center justify-center gap-3 bg-white cursor-pointer active:scale-95 p-2 rounded-xl'>
        {code ? (<img src={`https://flagcdn.com/w40/${code}.png`} className='w-7 h-7 rounded-full' alt="" />) : (null)}
        <button className='p-2 text-black'>{Selected}</button>
      </div>

      {open ? (
        <ul className='absolute z-50 top-full left-0 mt-1 w-full max-h-60 overflow-y-auto flex flex-col gap-2 bg-white border border-black rounded-xl p-2 shadow-lg'>
          {countries.map((c, idx) => (
            <li key={idx} onClick={() => {
              setSelected(c.name)
              CountryCode(c.code)
              country(c.name)
              setopen(false)
              setcode(c.code)
            }} className='flex gap-2 w-full items-center cursor-pointer hover:bg-gray-100 rounded-md'>

              <img src={`https://flagcdn.com/w40/${c.code}.png`} className='w-7 h-7 rounded-full' alt="" />
              <h1 className='w-full p-2 text-black'>{c.name}</h1>
            </li>
          ))}
        </ul>
      ) : (null)}

    </div>
  )
}

export default Country