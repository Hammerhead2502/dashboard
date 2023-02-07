import { useState } from "react";
import { useEffect } from "react";
import React from "react";
import axios from "axios"
import styles from "./dashboard-styles/widget2.module.css"
const {XMLParser} = require("fast-xml-parser")

export default function Widget2(){
    //Get data about Onepiece anime
    const [data,setData]=useState()
    //Get news out of data 
    const [newsArticles,setNewsArticles]=useState([])
    function fetch(){
    const url= "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=836"
    const main = axios.get(url)
    .then((response) => {
        //Use xml parser to parse into a js object
      const parser=new XMLParser()
    const animeDataXmlParser=parser.parse(response.data)
        //Store start and end points for the loop
        const startingPoint = animeDataXmlParser.ann.anime.news.length - 5
        const endPoint = animeDataXmlParser.ann.anime.news.length
        //Store only the top 5 latest news
        for(let i=startingPoint; i<endPoint; i++)
        {
            setNewsArticles((prev) => {
                return [...prev,
                animeDataXmlParser.ann.anime.news[i]]
            })
        }   
      setData(animeDataXmlParser.ann.anime.info[1])
  })
    }
    useEffect(() => {
        fetch()
    },[])
    let articles=[];
    newsArticles.forEach((article)=> {
        if (!articles.includes(article)) {
            articles.push(article);
        }
    })
  return (<div className={styles.widget2}>
        <div className={styles.dataContainer}>
        <h1>{data}</h1>
        {articles.map((article,index) => {
            return <p><span>{index+1}. </span>{article}</p>
        })
        }
        </div>
    </div>)
}





