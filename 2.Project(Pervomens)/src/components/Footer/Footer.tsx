import classes from './Footer.module.css';

export default function Footer(){
    return(
        <footer>
           <h3 className={classes.h3}>Connect</h3>
            <p className={classes.p}>© 2025, Lara corporation, Inc. Pervomens are trademarks or registered trademarks of 
                Pervomens Games, Inc. in the Larograd and elsewhere.</p>
        </footer>
    );
}