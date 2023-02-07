import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import styles from "./dashboard-styles/contacts.module.css"

export default function Contacts(){
const [contact, setContact] = useState({
    name: "",
    number: ""
})
const [savedContacts, setSavedContacts] = useState([])
const addContact = async (event) => {
        event.preventDefault()
        try{
            await axios.post("http://localhost:3001/addContact", {name: contact.name, number: contact.number}, {withCredentials: true}).then((res) => console.log(res))
        }
        catch(err){
            console.log(err)
        }
}
useEffect(() => {
    getContact()
}, [contact])
const getContact = async () => {
    try{
        await axios.get("http://localhost:3001/getContacts", { withCredentials: true}).then((res) => {
            setSavedContacts(res.data)
        })
    }
    catch(err){
        console.log(err)
    }
}
function makeContact(event){
    const value = event.target.value
    const id = event.target.id
    setContact((prevValue) => {
        return {...prevValue, [id]: value}
    })
}
const displayContacts = savedContacts.map((contact,index) => {
    return (<div className={styles.showAllContacts}>
    <h1><span>{index+1}. </span>{contact.name}</h1>
    <p>{contact.number}</p>
    </div>)
})
    return <div className={styles.container}><form method="POST">
        <div className={styles.createContact}><label htmlFor="name">Enter Contact Name</label>
        <input type="text" placeholder="Contact Name" id="name" name="name" value={contact.title} onChange={makeContact}></input>
        <label htmlFor="number">Enter Contact Number</label>
        <input type="text" placeholder="Contact Number" id="number" name="number" value={contact.number} onChange={makeContact}></input>
        <button onClick={addContact} type="submit">Click to add Contact</button></div>
    </form>
    {displayContacts}
</div>
}
