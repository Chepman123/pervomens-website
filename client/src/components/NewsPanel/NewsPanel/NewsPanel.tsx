import type { newsData } from '../../../data/newsData'
import Tag from '../../Tag/Tag'
import classes from './NewsPanel.module.css'
import { Link } from 'react-router-dom'

export default function NewsPanel({data}:{data:newsData}){
    return (
        <Link to={'/News/'+data.id} className={classes.a}>
            <img src={data.image} className={classes.img}/>
            <div className={classes.tags}>
                <Tag>Game</Tag>
                <Tag>{data.game}</Tag>
            </div>
            <div className={classes.info}>
                <h2 className={classes.h2}>{data.title}</h2>
                <div className={classes.borderDiv}/>
                <p className={classes.p}>{data.content}</p>
            </div>
           <p className={classes.p}>
    {`${new Date(data.createdat).getFullYear()}.${String(new Date(data.createdat).getMonth() + 1).padStart(2, '0')}.${String(new Date(data.createdat).getDate()).padStart(2, '0')}`}
</p>
        </Link>
    )
}