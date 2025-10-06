import Tag from '../../Tag/Tag'
import classes from './NewsPanel.module.css'
import { data } from '../../../data/newsData'
import { Link } from 'react-router-dom'

export default function NewsPanel({which}:{which:number}){
    return (
        <Link to={'/News/'+which} className={classes.a}>
            <img src={'/NewsData/'+which+'.jpg'} className={classes.img}/>
            <div className={classes.tags}>
                <Tag>{data[which].type}</Tag>
                <Tag>{data[which].game}</Tag>
            </div>
            <div className={classes.info}>
                <h2 className={classes.h2}>{data[which].tittle}</h2>
                <div className={classes.borderDiv}/>
                <p className={classes.p}>{data[which].post}</p>
            </div>
            <p className={classes.p}>{data[which].data}</p>
        </Link>
    )
}