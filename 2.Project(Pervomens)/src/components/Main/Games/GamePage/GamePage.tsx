import { useState, useEffect } from "react";
import SimpleButton from "../../../Buttons/SimpleButton/SimpleButton";
import Tag from "../../../Tag/Tag";
import classes from "./GamePage.module.css";
import type { gameData } from '../../../../data/gameData'
import { useParams } from "react-router-dom";
import { data as allGames } from '../../../../data/gameData';
import ImageFullScreen from "../../../Modal/ImageFullscrene";

export default function GamePage(){
     const { urlName } = useParams<{ urlName: string }>();
              
     
     const [data,setData] = useState<gameData|null>(null);

     useEffect(()=>{
          const game = allGames.find((g) => g.urlName === urlName) || null;
        setData(game);
        console.log("Lara");
     },[urlName]);

      if (!data) {
  return <h1>Game not found</h1>;
}
    return(<>
    <video className={classes.video} autoPlay muted loop>
        <source src="/Background/bg1.mp4" type="video/mp4"/>
    </video>
    <div className={classes.div}>
        <div>
            <h1 className={classes.h1}>{data.tittle}</h1>
            <section className={classes.tags}>
            <Tag>{data.genre}</Tag>
            <Tag>{data.platform}</Tag>
            <Tag>{data.engine}</Tag>
            </section>
        </div>
        <img className={classes.icon} src={'/GameData/'+data.tittle+'/Icon.jpg'}/>
    </div>
    <div className={classes.mainPart}>
    <section className={classes.screenshots}>
           {data.screenshots.map((screenshot)=>{
            return(<ImageFullScreen data={data}screenshot={screenshot}/>)
           })}
        </section>
        <article className={classes.article}>
            <h1 className={classes.desc}>Description</h1>
            <p className={classes.p}>{data.description}</p>
        </article>
        <section className={classes.buttons}>
            <SimpleButton buttonType="nav">Donwload last version</SimpleButton>
            <SimpleButton buttonType="nav">View other versions</SimpleButton>
        </section>
        <div className={classes.border}/>
        </div>
    </>)
}