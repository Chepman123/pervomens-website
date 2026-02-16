import { Link } from 'react-router-dom';
import classes from './GamesLink.module.css';

export default function GamesLink(){
    return(
        <div id="games" className={classes.div}>
            <Link to='/games' className={classes.a}><h1 className={classes.h1}>Games</h1></Link>
        </div>
    )
}