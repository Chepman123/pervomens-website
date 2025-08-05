import DetailsButton from '../Buttons/DetailsButton/DetailsButton';
import NavButton from '../Buttons/NavButton/NavButton';
import './Featured Games.css';


export default function FeaturedGames({left}:{left:boolean}){
    return(
        <article className='FeaturedGames' style={{flexDirection:left?'row-reverse':'row'}}>
        <img src='/GameScreenshots/1.jpg'/>
        <section>
         <div>
            <h1>Panic Plague</h1>
            <div className='borderDiv'/>
            <h4>Unreal Engine 5 · PC · Horror Game</h4>
         </div>
         <p>Years of research, innovation, and engineering have gone into creating Megascans, combining cutting-edge scanning hardware and processing software to achieve unparalleled photorealism. Instantly get rid of the plastic look of low-quality 3D scans, and push yourself far beyond just photorealism</p>
         <DetailsButton>See Details</DetailsButton>
        </section>
        </article>
    );
}