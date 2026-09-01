import NewsPanel from '../../NewsPanel/NewsPanel/NewsPanel';
import classes from './News.module.scss';
import NewsPage from './NewsPage';
import type { newsData } from '../../../data/newsData';
import { useEffect, useState } from 'react';

export default function News(){
    
    async function getData(){
      const response = await fetch('https://pervomens-website-2.onrender.com/News');
      setData(await response.json());
    }
    useEffect(()=>{
       getData();
    })
    const[data,setData] = useState<newsData[]>([]);
    return (
     <section className={classes.allNews}>
        
     <h1 className={classes.news}>News</h1>
     <div className={classes.newsPanels}>
     {data.map((news)=>{
        return(
            <NewsPanel data={news}/>
        );
     })}</div>
     </section>
    )
}