
import { useParams } from 'react-router-dom';
import Tag from '../../Tag/Tag';
import classes from './News.module.css';
import {data} from '../../../data/newsData';
export default function NewsPage(){
   const {newsId} = useParams<string>();
   const news = data[Number(newsId)];

    return (
     <article className={classes.article}>
        <div className={classes.div}>
     <img className={classes.img} src={'/NewsData/'+newsId+'.jpg'}/>
     <section className={classes.section}> 
     <h1 className={classes.h1}>{news.tittle}</h1>
     <div className={classes.tags}>
     <Tag>{news.type}</Tag>
        <Tag>{news.game}</Tag>
        </div>
        <h3 className={classes.h3}>{news.data}</h3>
     </section>
     </div>
     <p className={classes.p}>{news.text}</p>
     </article>
    )
}