import { Link } from 'react-router-dom';
import classes from'./Header.module.scss';
import {useEffect,useState, type CSSProperties} from 'react';
import Notification from '../Notification/Notification';

export interface notification{
    isread:boolean,
    content:string,
    newsid:number
}
export default function Header(){

   const[style,changeStyle] = useState<CSSProperties>();
   const[showNotif,setShow] = useState<boolean>(false);
   const[notifications,setNotifications] = useState<Notification[]>([]);
   const[displayHeader,setDisplay] = useState<boolean>(true);
   const[isMobile,setMobile] = useState<boolean>(false);
   

   useEffect(()=>{
       const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
       if(isMobile) setDisplay(false);
       setMobile(isMobile);
   },[])
   useEffect(() => {
    const scrollEffect = () => {
        let scrollCount = window.scrollY;

        if(scrollCount < 500) scrollCount = 0; 
        else scrollCount = scrollCount - 500;

       scrollCount/=2;

        if (scrollCount > 500) scrollCount = 700; 
        const headerBg = Math.min(Math.max(scrollCount * 0.01, 0), 0.75); 
        const headerSb = -20 + (13 / 700) * scrollCount; 
       
       const newStyle = {
        '--header-color':headerBg,
        '--header-shadow':`${headerSb}px`
       } as CSSProperties;

        changeStyle(newStyle);
    };

    window.addEventListener("scroll", scrollEffect);
    return () => window.removeEventListener("scroll", scrollEffect);
}, []);
const[role,setRole] = useState<'customer'|'admin'>();
 const[username,setUsername] = useState<string>();
    async function GetData() {
        const response = await fetch("https://pervomens-website-2.onrender.com", {
  method: 'GET',
  credentials: 'include', 
});
const result:{user:{username:string,role:'customer'|'admin'},notifications:Notification[]} = await response.json();
        setUsername(result.user.username);
        setRole(result.user.role );
        setNotifications(result.notifications);
        console.log(result.user.role);
    }
    useEffect(()=>{
         GetData();
    },[])
    function readNotif(){
        fetch("https://pervomens-website-2.onrender.com",{
            method:'PATCH'
        });
    }
    return (
        <header style={style}>
            <div className={classes.div} style={{display:displayHeader?'flex':'none',height:displayHeader?(isMobile?'500px':''):'0px'}}> 
                <Link to="/">Home</Link>
                <Link to="/Games">Games</Link>
                <Link to="/News">News</Link>
                <a href='#'>Wiki</a>
                <a href='#contact'>Contact</a>
            {!username && <Link to={"/Login"}>Log in</Link>}
            {username && <Link to={`/profile/${username}`}>{username}</Link>}
            {role =='admin'&&<>
            <Link to="/AdminPanel">Admin panel</Link>
            <Link to="/NewsCreator">News creator</Link>
            <button onClick={()=>{
                setShow(!showNotif);
                readNotif();
                }}><svg className={classes.svg}
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 22c1.1 0 2-.9 2-2h-4a2 2 0 002 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 00-3 0v.68C7.63 5.36 6 7.92 6 11v5l-1.99 2v1h16v-1l-2-2z" 
      fill="currentColor"
    />
  </svg>{
    notifications.length>0&&
    <h3 className={classes.h3}>{notifications.length}</h3>
  }</button>
  
            {showNotif&&
            <ul>
                {notifications?.map((notif)=>{
                    return <li><Notification data={notif}/></li>
                })}
            </ul>
            }
            </>
            }
            </div>
            <button className={classes.mobileButton} onClick={()=>setDisplay(!displayHeader)}>☰</button>
        </header>
    )
}
