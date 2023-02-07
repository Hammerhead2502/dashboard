import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import styles from "@/styles/Login.module.css"
import NavBar from "./NavBar";

export default function Register(){
    const router = useRouter()
    //Save inputs in state to then pass it as data
    const[registerEmail, setRegisterEmail] = useState("");
    const[registerPassword, setRegisterPassword] = useState("");

    const register = async (event) => {
        event.preventDefault()
        try{
            await axios.post("http://localhost:3001/register", {registerEmail, registerPassword}).then((res) => {
                if(res.status === 302){
                    console.log(res.response.data)
                }
                else if(res.status === 200){
                    //If successful register, push user to login page
                    router.push("/login")
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }

    return(<div className={styles.page}><NavBar></NavBar><div className={styles.container}><form method="POST" className= {styles.form}>
    <h3 className={styles.heading}>Register yourself</h3>
        <label htmlFor="userEmail" className={styles.label}>Enter Email ID : - </label><br></br>
        <input type="email" id="userEmail" onChange={(event) => setRegisterEmail(event.target.value)} name="userEmail" className={styles.input}></input><br></br>
        <label htmlFor="password" className={styles.label}>Enter Password : - </label><br></br>
        <input type="password" id="password" onChange={(event) => setRegisterPassword(event.target.value)} name="password" className={styles.input}></input><br></br>
        <button onClick={register} className={styles.button}>Register</button>
    </form>
    </div></div>)
}