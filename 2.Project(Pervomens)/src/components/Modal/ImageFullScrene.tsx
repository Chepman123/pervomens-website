import { useState } from 'react';
import Modal from './Modal';
import classes from "../Main/Games/GamePage/GamePage.module.css";
import type { gameData } from '../../data/gameData';

export default function ImageFullScreen({data,screenshot}:{data:gameData,screenshot:string}){
    const[open,setModal] = useState<boolean>(false);
    function showModal(){
      setModal(!open);
    }

    return(<>
    <Modal open={open} func={showModal}  data={data} which={data.screenshots.indexOf(screenshot)}/>
    <img onClick={showModal} className={classes.screenshot} src={'/GameData/'+data.tittle+'/Screenshots/'+screenshot+'.jpg'}/>
    </>)
}