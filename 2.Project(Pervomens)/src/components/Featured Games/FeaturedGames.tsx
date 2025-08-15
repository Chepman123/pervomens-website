import Button from '../Buttons/SimpleButton/SimpleButton';
import classes from './FeaturedGames.module.css';


export default function FeaturedGames({left}:{left:boolean}){
    return(
        <article className={classes.article} style={{flexDirection:left?'row-reverse':'row'}}>
        <img className={classes.img} src='/GameScreenshots/1.jpg' alt='game screenshot'/>
        <section className={classes.section}>
         <div>
            <h1 className={classes.h1}>Panic Plague</h1>
            <div className={classes.borderDiv}/>
            <h4 className={classes.h4}>Unreal Engine 5 · PC · Horror Game</h4>
         </div>
         <p className={classes.p}>Years of research, innovation, and engineering have gone into creating Megascans, combining cutting-edge scanning hardware and processing software to achieve unparalleled photorealism. Instantly get rid of the plastic look of low-quality 3D scans, and push yourself far beyond just photorealism</p>
         <Button buttonType='details'>See Details</Button>
        </section>
        </article>
    );
}