import { useEffect, useRef, useState } from 'react';
import classes from './Modal.module.css';
import { createPortal } from "react-dom";
import type { gameData } from '../../data/gameData';

export default function Modal({open,func,data,which}:{open:boolean,func:() =>void,data:gameData,which:number}){
    const modalElement=useRef<HTMLDialogElement>(null);
    useEffect(()=>{
        if(open) modalElement.current?.showModal();
        else{ 
            modalElement.current?.close();
            setCurrentIndex(which);
        }
    },[open])

    const [currentIndex, setCurrentIndex] = useState(which);
    const src = '/GameData/' + data.tittle + '/Screenshots/' + data.screenshots[currentIndex] + '.jpg';

    function changeImage(delta: number) {
  setCurrentIndex(prev => {
    let next = prev + delta;
    if (next < 0) next = data.screenshots.length - 1;
    if (next >= data.screenshots.length) next = 0;
    return next;
  });
  
}


    return createPortal(
        
        <dialog ref={modalElement} className={classes.dialog} >
            <img src={src} className={classes.img}/>
            <div className={classes.buttons}>
                <a onClick={() => changeImage(-1)}>{"<"}</a>
                 <a href={src} download>Download</a>
                <a onClick={func}>Close</a>
                <a onClick={() => changeImage(1)}>{">"}</a>
            </div>
            
        </dialog>
        ,
        document.getElementById("mainpart")!
    )
}