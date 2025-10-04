import Tag from '../../Tag/Tag'
import classes from './NewsPanel.module.css'

export default function NewsPanel(){
    return (
        <a className={classes.a}>
            <img src='/GameData/PanicPlague/Screenshots/1.png' className={classes.img}/>
            <div className={classes.tags}>
                <Tag>Game</Tag>
                <Tag>Panic Plague</Tag>
            </div>
            <div className={classes.info}>
                <h2 className={classes.h2}>Panic Plague realese</h2>
                <div className={classes.borderDiv}/>
                <p className={classes.p}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia adipisci earum, facere, ab minima eum molestiae nihil dolorem nobis beatae deleniti dolor iste voluptatem dolore distinctio, dolores itaque alias vero!</p>
            </div>
            <p className={classes.p}>06.09.2025</p>
        </a>
    )
}