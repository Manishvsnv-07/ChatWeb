import axios from "axios"

const getUsers = async ()=>{
    const res = await axios.get("http://localhost:8080/getUsers",{withCredentials:true})
    return res.data.AllUsers
}

export {getUsers}

