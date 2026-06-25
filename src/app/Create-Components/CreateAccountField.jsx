"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Gender from './Gender'
import Status from './Status'
import Country from './Country'

const CreateAccountField = () => {
    const [Email, setEmail] = useState('')
    const [Name, setName] = useState('')
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("")
    const [country, setcountry] = useState("")
    const [countrycode, setcountrycode] = useState('')
    console.log(countrycode);
    
    const router = useRouter()

    const CreateAccount = async () => {
        try {
            const data = await axios.post("http://localhost:8080/create/account", {
                email: Email,
                name: Name,
                username: Username,
                password: Password,
                gender: gender,
                status:status,
                country:country,
                countrycode:countrycode
            }, { withCredentials: true })
            if (data.status === 200) {
                router.push("/")
            }

        } catch (error) {

        }
    }
    return (
        <div className="UserEntry m-3 bg-[url('/imgs/createAccount.webp')] bg-cover bg-center z-11 w-1/3 rounded-xl overflow-auto">
            <div className="LoginBox h-full bg-transparent flex flex-col gap-5 p-3">
                <input type='email' onChange={(e) => {
                    setEmail(e.target.value)

                }} value={Email} placeholder='Your Email' className='w-full p-3 bg-transparent border border-[#131413bb] text-black rounded-xl outline-none' />

                <input type="text" onChange={(e) => {
                    setUsername(e.target.value)

                }} value={Username} placeholder='Enter Username' className='w-full p-3 bg-transparent border border-[#131413bb] text-black rounded-xl outline-none' />


                <input type="text" onChange={(e) => {
                    setName(e.target.value)

                }} value={Name} placeholder='Enter Name' className='w-full p-3 bg-transparent border border-[#131413bb] text-black rounded-xl outline-none' />

                <input type="password" onChange={(e) => {
                    setPassword(e.target.value)

                }} value={Password} placeholder='Enter Password' className='w-full p-3 bg-transparent border border-[#131413bb] text-black rounded-xl outline-none' />


                <Gender onSelect={setGender} selected={gender} />
                <Status onSelect={setStatus} selected={status}/>
                <Country country={setcountry} CountryCode={setcountrycode}/>
                
                <button onClick={CreateAccount} className='bg-[#deede9f6] border border-[#75d1bcbb] rounded-md h-11 active:brightness-120 active:scale-99 cursor-pointer text-black'>Sign Up</button>
            </div>
        </div>
    )
}

export default CreateAccountField