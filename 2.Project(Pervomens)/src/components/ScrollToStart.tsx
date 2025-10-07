import { useEffect } from "react"
import { useLocation } from "react-router-dom";
export default function ScrollToStart(){
   const {pathname} = useLocation();
    useEffect(()=>{
        scrollTo(0,0);
    },[pathname])

    return <></>
}