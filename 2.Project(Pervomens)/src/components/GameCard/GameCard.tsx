import { Link } from 'react-router-dom'
import type { gameData } from '../../data/gameData'
import Tag from '../Tag/Tag'
import classes from './GameCard.module.css'

export default function GameCard({data}:{data:gameData}){
    return (<Link to={"/Games/"+data.urlName} className={classes.a}>
        <img className={classes.screenshot} src={'/GameData/'+data.tittle+'/Screenshots/1.jpg'}/>
        <div className={classes.div}>
        <img className={classes.icon} src={'/GameData/'+data.tittle+'/Icon.jpg'}/>
        <div className={classes.tittle}>
        <h3 className={classes.h3}>{data.tittle}</h3>
        <section className={classes.section}>
         <Tag>{data.platform}</Tag>
         <Tag>{data.genre}</Tag>
         </section>
        </div>
        </div>
    </Link>)
}