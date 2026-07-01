import axios from "axios"

const getUsers = async (page = 1, limit = 20) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/getUsers`, {
    withCredentials: true,
    params: { page, limit }
  })
  return res.data 
}

export { getUsers }
