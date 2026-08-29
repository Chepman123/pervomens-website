import type ReviewInter from "../../interfaces/Review";
import classes from './Review.module.scss';
import userIcon from '../../../public/User.png'
import { Link } from "react-router-dom";
export default function Review({data}:{data:ReviewInter}){
    return <div className={classes.div}>
        <Link to={`/profile/${data.createdby}`}>
    <img src={data.avatar==null?userIcon:data.avatar} className={classes.img}/>
    </Link>
    <div className={classes.message}>
    <h1 className={classes.h1}>{data.createdby}</h1>
    <p className={classes.p}>{data.content}</p>
    </div>
    <h3 className={classes.h3}>{`${new Date(data.createdat).getFullYear()}.${String(new Date(data.createdat).getMonth() + 1).padStart(2, '0')}.${String(new Date(data.createdat).getDate()).padStart(2, '0')}`}</h3>
    </div>
}