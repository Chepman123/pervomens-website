import classes from'./Header.module.css';
import {useEffect,useState} from 'react';

export default function Header(){

    useEffect(()=>{},[]);

    return (
        <header className={/*classes.scrolledHeader*/""}>
            <div className={classes.div}>
                <a href='#games'>Games</a>
                <a href='#'>News</a>
                <a href='#'>Wiki</a>
                <a href='#'>About</a>
                <a href='#'>Contact</a>
            </div>
        </header>
    )
}
