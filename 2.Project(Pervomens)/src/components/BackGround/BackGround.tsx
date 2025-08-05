import './BackGround.css';
import { videosSRC } from '../../data/backgroundData';

export default function BackGround(){
   function getRandomBg():string{
    let rand:number=getRandom(videosSRC.length);

    return videosSRC[rand];
   }

    return(
        <video autoPlay muted loop playsInline className="bg-video">
                    <source src={getRandomBg()} type="video/mp4" /></video>
    );
}
function getRandom(max:number):number{
   return Math.floor(Math.random()*max);
}