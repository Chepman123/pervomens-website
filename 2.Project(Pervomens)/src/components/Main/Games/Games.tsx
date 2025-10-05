import GameCard from "../../GameCard/GameCard";
import classes from './Games.module.css'
import {data} from '../../../data/gameData'

export default function Games(){
    return(
    <>
        <h1 className={classes.h1}>Games</h1>

    <div className={classes.div}>
       {data.map((gameData)=>{
        return (<GameCard data={gameData}/>)
       })}
       
    </div>
    </>)
}
