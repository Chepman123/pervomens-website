import NewsPanel from "./NewsPanel/NewsPanel";
import classes from "./NewsPanels.module.css";

export default function NewsPanels() {


  return (
    <article id="news"className={classes.article}>
      <a href="#" className={classes.a}><h1 className={classes.h1}>News</h1></a>
        <ul className={classes.ul}>
          <li>
            <NewsPanel/>
          </li>
          <li>
            <NewsPanel/>
          </li>
          <li>
            <NewsPanel/>
          </li>
          <li>
            <NewsPanel/>
          </li>
          <li>
            <NewsPanel/>
          </li>
        </ul>
    </article>
  );
}
