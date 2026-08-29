import { Link } from "react-router-dom";
import type { notification } from "../Header/Header";
import classes from './Notification.module.scss'

export default function Notification({data}:{data:notification}){
    return <Link to={`/news/${data.newsid}`} className={classes.a}>{data.content}</Link>
}