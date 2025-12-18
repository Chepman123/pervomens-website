import NewsPanel from '../../NewsPanel/NewsPanel/NewsPanel';
import classes from './News.module.css';
import NewsPage from './NewsPage';
import {data} from '../../../data/newsData'

export default function News(){
    return (
     <section className={classes.allNews}>
        
     <h1 className={classes.news}>News</h1>
     <div className={classes.newsPanels}>
     {data.map((news)=>{
        return(
            <NewsPanel which={data.indexOf(news)}/>
        );
     })}</div>
     </section>
    )
}