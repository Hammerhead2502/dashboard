import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import styles from "@/styles/Login.module.css"
import NavBar from "./NavBar"

export default function Login(){
    const router = useRouter()
    //Store the 2 inputs from user in different state 
    const [registerEmail, setRegisterEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")

    const login = async (event) => {
        event.preventDefault()
            try{
                //Pass the inputs as data in the axios post method
                //Pass withCredentials as true otherwise Cookie wont be generated
                await axios.post("http://localhost:3001/login", {registerEmail, registerPassword}, { withCredentials: true }).then((res) => {
                    if(res.status === 200){
                        //If successful login, push them to dashboard page
                        router.push("/dashboard/dashboard")
                    }
                    else{
                        router.push("/login")
                    }
                })
            }
            catch(err){
                console.log(err)
            }
        }
   
    return( <div className={styles.page}><NavBar></NavBar><div className={styles.container}>
    <form method="POST" className= {styles.form}>
        <h3 className={styles.heading}>User LogIn</h3>
        <label htmlFor="email" className={styles.label}>Enter Email ID : - </label><br></br>
        <input type="text" id="email" onChange={() => setRegisterEmail(event.target.value)} className={styles.input}></input><br></br>
        <label htmlFor="password" className={styles.label}>Enter Password : - </label><br></br>
        <input type="password" id="password" onChange={() => setRegisterPassword(event.target.value)} className={styles.input}></input><br></br>
        <button onClick={login} className={styles.button}>Login</button>
    </form>
    </div></div>)
}