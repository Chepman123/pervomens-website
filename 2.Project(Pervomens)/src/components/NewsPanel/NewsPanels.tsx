import NewsPanel from "./NewsPanel/NewsPanel";
import classes from "./NewsPanels.module.css";
import {data} from '../../data/newsData'
export default function NewsPanels() {


  return (
    <article id="news"className={classes.article}>
      <a href="#" className={classes.a}><h1 className={classes.h1}>News</h1></a>
        <ul className={classes.ul}>
          <li>
            <NewsPanel which={data.length-1}/>
          </li>
          <li>
            <NewsPanel which={data.length-2}/>
          </li>
          <li>
            <NewsPanel which={data.length-3}/>
          </li>
          <li>
            <NewsPanel which={data.length-4}/>
          </li>
          <li>
            <NewsPanel which={data.length-5}/>
          </li>
        </ul>
    </article>
  );
}
