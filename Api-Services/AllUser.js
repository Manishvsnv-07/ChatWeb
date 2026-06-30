import axios from "axios"

const getUsers = async (page = 1, limit = 20) => {
  const res = await axios.get("http://localhost:8080/getUsers", {
    withCredentials: true,
    params: { page, limit }
  })
  return res.data 
}

export { getUsers }