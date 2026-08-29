import ReviewCom from '../../Review/Review';
import { useParams } from 'react-router-dom';
import Tag from '../../Tag/Tag';
import classes from './News.module.scss';
import { useEffect, useState } from 'react';
import type{ newsData } from '../../../data/newsData';
import type Review from '../../../interfaces/Review';
export default function NewsPage(){
   const {newsId} = useParams<string>();
   const[reviews,setReviews] = useState<Review[]>([]);
   async function GetData() {
      const response = await fetch(`http://localhost:5000/News/${newsId}`);
      const result = await response.json();
      setReviews(result.reviews);
      setNews(result.news);
   }
   useEffect(()=>{
      GetData();
   })
   async function SendReview(){
      await fetch(`http://localhost:5000/News/${newsId}`,{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({review}),
         credentials:'include'
      });
      GetData();
   }
   const[news,setNews] = useState<newsData>({
    title:'',
    content:'',
    text:'',
    createdat:new Date(),
    type:"game",
    game:'',
    id:1,
})
   const[review,setReview] = useState<string>();
    return (
     <article className={classes.article}>
        <div className={classes.div}>
     <img className={classes.img} src={news.image}/>
     <section className={classes.section}> 
     <h1 className={classes.h1}>{news.title}</h1>
     <div className={classes.tags}>
     <Tag>{'game'}</Tag>
        <Tag>{news.game}</Tag>
        </div>
        <h3 className={classes.h3}>{`${new Date(news.createdat).getFullYear()}.${String(new Date(news.createdat).getMonth() + 1).padStart(2, '0')}.${String(new Date(news.createdat).getDate()).padStart(2, '0')}`}</h3>
     </section>
     </div>
     <p className={classes.p}>{news.content}</p>
     <div className={classes.comment}>
     <input type='text' value={review} onChange={(e)=>{setReview(e.target.value)}} placeholder='comment'/>
     <button onClick={SendReview}>Send</button>
     </div>
     <br/>
     {reviews.map((reviewData)=>{
      return <ReviewCom data={reviewData}/>
     })}
     </article>
    )
}