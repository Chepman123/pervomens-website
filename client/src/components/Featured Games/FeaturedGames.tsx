import classes from './FeaturedGames.module.css';
import {data} from '../../data/gameData'
import {type gameData} from '../../data/gameData'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeaturedGames({which}:{which:number}){
   const game:gameData = data[which];

   const [screenshot,setScreenshot] = useState<number>(0)

   const imgSRC:string = '/GameData/'+game.tittle+'/Screenshots/'+data[which].screenshots[screenshot]+'.jpg';
    useEffect(()=>{
        const interval = setInterval(() => {
      if(screenshot+1>=data[which].screenshots.length) setScreenshot(0)
      else setScreenshot(screenshot+1)
    }, 5000); 

    return () => clearInterval(interval);
    },[screenshot])

    return(
        <article className={classes.article} style={{flexDirection:(which+1)%2==0?'row':'row-reverse'}}>
       <AnimatePresence mode="wait">
          <motion.img
            key={screenshot} // ключ важливий для анімації переходу
            src={imgSRC}
            alt="game screenshot"
            className={classes.img}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        <section className={classes.section}>
         <div>
            <h1 className={classes.h1}>{game.tittle}</h1>
            <div className={classes.borderDiv}/>
            <h4 className={classes.h4}>{game.engine+" · "+game.platform+" · "+game.genre}</h4>
         </div>
         <p className={classes.p}>{game.description}</p>
         <Link className={classes.Link} to={'/Games/'+game.urlName}>See Details</Link>
        </section>
        </article>
    );
}