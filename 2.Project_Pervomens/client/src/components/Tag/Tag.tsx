import classes from './Tag.module.css';

export default function Tag({children}:{children:string})
{
    return <p className={classes.p}>{children}</p>
}