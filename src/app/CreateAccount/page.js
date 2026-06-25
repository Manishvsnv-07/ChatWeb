import React from 'react'
import SideviewCreate from '../Create-Components/SideviewCreate'
import CreateAccountField from '../Create-Components/CreateAccountField'
const page = () => {
    

    return (
        <div className="main h-screen w-full flex justify-center bg-[#75d1bc9b] ">
            <SideviewCreate />
            <CreateAccountField/>
        </div>
    )
}

export default page