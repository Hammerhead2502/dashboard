import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./dashboard-styles/widget3.module.css"

export default function Widget3(){
    //State to store top 10 news of a particular category in an array
    const [newsArray, setNewsArray] = useState([])
    const categories = ["all","national","business","sports","world","politics","technology","startup","entertainment","miscellaneous","hatke","science","automobile"]
    //State to store which category user has chosen
    const  [category, setCategory] = useState("")
    const getNews = async() => {
        const url = `https://inshorts.deta.dev/news?category=${category}`
        try{
           await fetch(url).then((res) => res.json()).then((data) => setNewsArray(data.data))
        }
        catch(err){
            console.log(err)
        }
    }
    //Use category to call useEffect
    useEffect(() => {
        getNews()
    },[category])
    const displayCategories = categories.map((category) => {
        return <option value={category}>{category}</option>
    })
    //Get top 10 news
    const newNewsArray = newsArray.slice(0,10)
    const displayNews = newNewsArray.map((article, index) => {
        return <div className={styles.eachArticle}>
            <h1><span>{index+1}. </span>{article.title}</h1>
            <p>{article.content}<a href={article.url}>Read more...</a></p>
        </div>
    })
    return <div className={styles.widget3}>
   <div className={styles.categorySelector}> <label>Select news category :- </label>
        <select onChange={(event) => setCategory(event.target.value)}>
            {displayCategories}
        </select></div>
        <div className={styles.newsContainer}>
            {displayNews}
        </div>
    </div>
}