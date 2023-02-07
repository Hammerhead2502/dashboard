import axios from "axios"
import { useState } from "react"
import styles from "./dashboard-styles/widget4.module.css"

export default function Widget4(){
    //Store country input as a state
    const [countryName, setCountryName] = useState("")
    //Store fetched stocks in a state inside an array
    const [stocks, setStocks] = useState([])
    const getStocks = async () => {
        const url = `https://api.twelvedata.com/stocks?country=${countryName}`
        try{
                await axios.get(url, {responseType: 'json'}).then((res) => {
                    setStocks(res.data.data)
                })
        }
        catch(err){
            console.log(err)
        }
    }
    //Get top 25 stocks
    const stocksData = stocks.slice(0,25)
    const displayStocks = stocksData.map((stock) => {
        return (<div className={styles.eachStock}>
            <h3>Stock name :- {stock.name}</h3>
            <p>Country :- {stock.country}</p>
            <p>Currrency :- {stock.currency}</p>
            <p>Exchange :- {stock.exchange}</p>
            <p>MIC code :- {stock.mic_code}</p>
            <p>Symbol :- {stock.symbol}</p>
            <p>Type :- {stock.type}</p>
        </div>)
    })
    
    return <div className={styles.widget4}>
        <div className={styles.searchStocks}><label htmlFor="countryName">Enter country - </label>
        <input type="text" placeholder="Enter country name" onChange={(event) => setCountryName(event.target.value)} id="countryName"></input>
        <button onClick={getStocks}>Search</button></div>
        <div className={styles.displayData}>{displayStocks}</div>
    </div>
}