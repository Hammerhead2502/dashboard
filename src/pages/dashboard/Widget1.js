import styles from "./dashboard-styles/widget1.module.css"
import { useState } from "react";

export default function Widget1(){
    //Make state to store if user has provided a city has an input
    const [cityProvided, setCityProvided]=useState(false)
    //Make state to store data fetched for the city
    const [cityData,setCityData] = useState({
        userCity:"",
        dataCity:"",
        description:"",
        temp:"",
        temp_min:"",
        temp_max:"",
        humidity:"",
        pressure:"",
        wind_speed:""
    })
    function setCity(event){
        //Set city value equal to the value that the user inputs using onchange()
        const name=event.target.value;
        setCityData((prev)=> {
            return {
                ...prev,
                userCity: name
            }
        })
    }
    const fetchWeatherData = () => {
    const query=cityData.userCity
    //Set cityProvided to true so that the details can be displayed
    setCityProvided(()=> { 
        if(query.length)
        {
            return true;
        }
        else {
            return false
        }
    })
    const id= process.env.WEATHER_KEY  
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+id+"&q="+query+"&units=metric"
     //Fetch data from the API
        fetch(url)           
   .then((response) => response.json())
   .then((data) => {
    setCityData((prevData) => {
        //Store the data in state
        return {
            ...prevData,
            dataCity: data.name,
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
            pressure: data.main.pressure,
            description: data.weather[0].description
        }
        
    })
});
    }
    //Display the fetched result
    return (<div className={styles.widget1}>
        <input name="cityName" placeholder="Enter City Name" value={cityData.userCity} onChange={setCity} className={styles.input}></input>
        <button onClick={fetchWeatherData} className={styles.button}>Get weatherData</button>
        {/* If cityProvided then only display the div that contains the data */}
        {cityProvided ? <div className={styles.dataContainer}>  
        <p>City name - {cityData.dataCity}</p>
        <p>Weather description - {cityData.description}</p>
        <p>Temperature - {cityData.temp} °C</p>
        <p>Minimum temperature - {cityData.temp_min} °C</p>
        <p>Maximum temperature - {cityData.temp_max} °C</p>
        <p>Humidity - {cityData.humidity}%</p>
        <p>Pressure - {cityData.pressure}</p>
        <p>Wind-Speed - {cityData.wind_speed} km/h</p>
        </div> : null}
    </div>)    
}
