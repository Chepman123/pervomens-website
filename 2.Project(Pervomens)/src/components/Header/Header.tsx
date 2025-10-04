import { Link } from 'react-router-dom';
import classes from'./Header.module.css';
import {useEffect,useState, type CSSProperties} from 'react';

export default function Header(){

   const[style,changeStyle] = useState<CSSProperties>();
   
   useEffect(() => {
    const scrollEffect = () => {
        let scrollCount = window.scrollY;

        if(scrollCount < 500) scrollCount = 0; 
        else scrollCount = scrollCount - 500;

       scrollCount/=2;

        if (scrollCount > 700) scrollCount = 700; 
        const headerBg = Math.min(Math.max(scrollCount * 0.01, 0), 0.75); 
        const headerSb = -20 + (13 / 700) * scrollCount; 
       
       const newStyle = {
        '--header-color':headerBg,
        '--header-shadow':`${headerSb}px`
       } as CSSProperties;

        changeStyle(newStyle);
    };

    window.addEventListener("scroll", scrollEffect);
    return () => window.removeEventListener("scroll", scrollEffect);
}, []);

    return (
        <header style={style}>
            <div className={classes.div}>
                <Link to="/"><a href='#'>Home</a></Link>
                <a href='#games'>Games</a>
                <a href='#news'>News</a>
                <a href='#'>Wiki</a>
                <a href='#contact'>Contact</a>
            </div>
        </header>
    )
}
