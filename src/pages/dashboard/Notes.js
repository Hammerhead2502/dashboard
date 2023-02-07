import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import styles from "./dashboard-styles/notes.module.css"

export default function Notes(){
const [note, setNote] = useState({
    title: "",
    message: ""
})
const [savedNotes, setSavedNotes] = useState([])
const addNote = async (event) => {
        event.preventDefault()
        try{
            await axios.post("http://localhost:3001/addNote", {title: note.title, message: note.message}, {withCredentials: true}).then((res) => console.log(res))
        }
        catch(err){
            console.log(err)
        }
}
useEffect(() => {
    getNote()
}, [note])
const getNote = async () => {
    try{
        await axios.get("http://localhost:3001/getNotes", { withCredentials: true}).then((res) => {
            setSavedNotes(res.data)
        })
    }
    catch(err){
        console.log(err)
    }
}
function makeNote(event){
    const value = event.target.value
    const id = event.target.id
    setNote((prevValue) => {
        return {...prevValue, [id]: value}
    })
}
const displayNotes = savedNotes.map((note,index) => {
    return (<div className= {styles.showAllNotes}>
    <h1><span>{index+1}. </span>{note.title}</h1>
    <p>{note.message}</p>
    </div>)
})
    return <div className={styles.container}><form method="POST">
        <div className={styles.createNote}><label htmlFor="title">Enter Note title</label>
        <input type="text" placeholder="Note title" id="title" name="title" value={note.title} onChange={makeNote}></input>
        <label htmlFor="message">Enter Note message</label>
        <input type="text" placeholder="Note title" id="message" name="message" value={note.message} onChange={makeNote}></input>
        <button onClick={addNote} type="submit">Click to add Note</button>
        </div>
    </form>
    {displayNotes}
</div>
}

