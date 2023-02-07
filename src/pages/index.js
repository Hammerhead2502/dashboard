import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css"
import NavBar from "./NavBar";

export default function Home() {
  const router = useRouter()  
  const checkIfCookieExist = async () => {
    //Check if cookie already exist, if it does direct them to the dashboard page
      try{
          await axios.get("http://localhost:3001/", { withCredentials: true }).then((res) => {
            if(res.status === 200){
              router.push("http://localhost:3000/dashboard/dashboard")
            }
            else{
              router.push("http://localhost:3000/")
            }
          })
      }
      catch(err){
        console.log(err)
      }
  }
  useEffect(() => {
    checkIfCookieExist()
  }, [])
  return <div className={styles.container}><img src="" alt="Logo" className={styles.logo}></img>
    <NavBar></NavBar>
    <h1 className={`${styles.heading}`}>Welcome to <br></br>myDashboard</h1>
  </div>
}


