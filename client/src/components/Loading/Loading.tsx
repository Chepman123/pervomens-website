import { useEffect, useState } from "react"
import classes from './Loading.module.scss'
export default function Loading({display}:{display:boolean}){
    return <main className={classes.main} style={{display:display?'flex':'none'}}>
        <h1>Loading</h1>
    </main>
}