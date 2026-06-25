'use client'
import useClickedUserStore from "@/store/UserClickeduseStore";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Clickedprofile() {
    let { username } = useParams()
    let router = useRouter()
    console.log(username);

    const setClickedUser = useClickedUserStore((state) => state.setClickedUser)
    const setLoading = useClickedUserStore((state) => state.setLoading)

    useEffect(() => {
      setLoading(true)
      
      axios.get(`http://localhost:8080/ClickedUserData/${username}`)
        .then((res) => {
          console.log(res.data.FindClickedUser);
          setClickedUser(res.data.FindClickedUser)
          setLoading(false)
          router.push("/Clickedprofile") 
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
        
    }, [username])

}
