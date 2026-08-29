import NewsPanel from "./NewsPanel/NewsPanel";
import classes from "./NewsPanels.module.css";
import {data, type newsData} from '../../data/newsData'
import { useEffect, useState } from "react";
export default function NewsPanels() {

async function getData(){
 
      const response = await fetch('http://localhost:5000/News/Main');
      setData(await response.json());
    }
    useEffect(()=>{
       getData();
    })
    const[data,setData] = useState<newsData[]>([]);
  return (
    <article id="news"className={classes.article}>
      <a href="#" className={classes.a}><h1 className={classes.h1}>News</h1></a>
        <ul className={classes.ul}>
          {data.map((news)=>{
            return  <li>
            <NewsPanel data={news}/>
          </li>
          })}
        </ul>
    </article>
  );
}
