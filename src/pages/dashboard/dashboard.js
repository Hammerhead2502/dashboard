import Widget1 from "./Widget1"
import Widget2 from "./Widget2"
import Widget3 from "./Widget3"
import Widget4 from "./Widget4"
import styles from "./dashboard-styles/dashboard.module.css"
import { useState } from "react"
import Notes from "./Notes"
import Contacts from "./Contacts"
import axios from "axios"
import { useRouter } from "next/router"

export default function Dashboard(){
    const router = useRouter()
    const [dashboardOption, setDashboardOption] = useState("Home")
    const dashboardOptionArray = ["Home", "Notes", "Contacts", "Logout"]
    const options = dashboardOptionArray.map((option) => {
        return <div><button onClick={handleClick} className={styles.options} value={option}>{option}</button></div>
    })
    function handleClick(event){
        const optionChosen = dashboardOptionArray.find((option) => option === event.target.value)
        setDashboardOption(optionChosen)
    }
    const logout = async() => {
        try{
            await axios.get("http://localhost:3001/logout", { withCredentials: true}).then((res) => {
                if(res.status === 200){
                    router.push("http://localhost:3000/")
                }
            })
        }
        catch(err){
            console.log(err)
        }
    }    
    const getDiv = () => {
    switch(dashboardOption){
    case "Home":
        return (<div className={styles.gridLayout}>
        <Widget1></Widget1>
        <Widget2></Widget2>
        <Widget3></Widget3>
        <Widget4></Widget4>
    </div>)
        break
    case "Notes":
        return <Notes></Notes>
        break 
    case "Contacts":
        return <Contacts></Contacts>
        break
    case "Logout":
        logout()
        break   
}
    }
    return(<div className={styles.mainLayout}>
        <div className={styles.sidebar}>
        <img src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/12/19/247181.jpg" alt="user image" className={styles.userImage}></img>
            {options}
        </div>
        {getDiv()}
    </div>)
} 

