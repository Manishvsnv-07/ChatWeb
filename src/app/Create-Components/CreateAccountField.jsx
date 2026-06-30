"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Gender from './Gender'
import Status from './Status'
import Country from './Country'
import { Heading1, User } from 'lucide-react'
import Createheader from './Createheader'
import Image from 'next/image'

const CreateAccountField = () => {
    const [Email, setEmail] = useState('')
    const [EmailError, setEmailError] = useState('')
    const [Name, setName] = useState('')
    const [Username, setUsername] = useState('')
    const [Password, setPassword] = useState('')
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("")
    const [country, setcountry] = useState("")
    const [countrycode, setcountrycode] = useState('')

    const ValidationEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const router = useRouter()

    const CreateAccount = async () => {
        try {
            if (!ValidationEmail(Email)) {
                setEmailError("Invalid email! Example: abc@gmail.com")
                return
            }
            const data = await axios.post("http://localhost:8080/create/account", {
                email: Email,
                name: Name,
                username: Username,
                password: Password,
                gender: gender,
                status: status,
                country: country,
                countrycode: countrycode
            }, { withCredentials: true })
            if (data.status === 200) {
                router.push("/")
            }

        } catch (error) {

        }
    }
    return (
        <div className="UserEntry relative z-11 w-full sm:w-1/2 lg:w-1/3 overflow-auto">
            <Image
                src="/imgs/createAccount.webp"
                alt=""
                fill
                priority
                quality={80}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover -z-10"
            />
            <div className="SignUpBox h-full bg-transparent flex flex-col gap-4 p-2 overflow-auto">

                <Createheader />
                <input type='email' required onChange={(e) => {
                    setEmail(e.target.value)

                }} value={Email} placeholder='Your Email' className='w-full p-3 bg-transparent border border-[#131413bb] text-black rounded-xl outline-none' />
                {EmailError && <p style={{ color: "red", fontSize: "15px" }}>{EmailError}</p>}
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
                <Status onSelect={setStatus} selected={status} />
                <Country country={setcountry} CountryCode={setcountrycode} />

                {
                    Email && Name && Username && Password && gender && status && countrycode ?
                        (<button onClick={CreateAccount} className='bg-[#deede9f6] border p-2 border-[#75d1bcbb] rounded-md h-11 active:brightness-120 active:scale-99 cursor-pointer text-black'>Sign Up</button>)
                        : (<h1 className='w-full flex justify-center text-white font-semibold'>Fill all Fields ✅</h1>)
                }

            </div>
        </div>
    )
}

export default CreateAccountField
