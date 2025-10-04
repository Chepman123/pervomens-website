import classes from './Footer.module.css';
import gamejolt from './gamejolt.svg';

export default function Footer() {
  return (
    <footer id='contact'>
      <h1 className={classes.h1}>Contact</h1>
      <span className={classes.span}>
      <p className={classes.p}>
        email: Vladshlapak333@gmail.com
      </p>
      <p className={classes.p}>
        main author: Vlad Shlapak
      </p>
      <p className={classes.p}>
        sponsor: Lara corporation
      </p>
      </span>
      <div className={classes.socialIcons}>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={`${classes.icon} ${classes.twitter}`}>
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://t.me/perv_games" target="_blank" rel="noreferrer" className={`${classes.icon} ${classes.telegram}`}>
          <i className="fab fa-telegram"></i>
        </a>
        <a href="https://www.youtube.com/@perv_comp" target="_blank" rel="noreferrer" className={`${classes.icon} ${classes.youtube}`}>
          <i className="fab fa-youtube"></i>
        </a>
       <a href="https://gamejolt.com/@PERVOMENS_GAMES" target="_blank" rel="noreferrer" className={`${classes.icon} ${classes.gamejolt}`}>
          <img src={gamejolt} alt="GJ" />
       </a>
      </div>
    </footer>
  );
}
