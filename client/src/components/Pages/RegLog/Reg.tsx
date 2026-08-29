import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegLog.module.scss";
import type { RegLogResult } from "../../../interfaces/LogReg";
import BackGround from "../../BackGround/BackGround";

export default function Reg(){
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
     const [result,setResult] = useState<RegLogResult>(null);
     const navigate = useNavigate();
    async function Reg(){
       const response = await fetch("https://pervomens-website-2.onrender.com/Reg",{
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({username:username,password:password}),
        credentials: 'include'
       })
       const result = await response.json();
       setResult(result);
       if(result == null) navigate("/");
    }

    return <main className={classes.main}>
        <BackGround/>
    <form className={classes.form}>
        <h1>Sign up</h1>
        <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Link to={"/Login"}>I already have an account</Link>
        {
            result != null &&<p>{result=="username"?"username already exists":"password is weak"}</p>
        }
        <button type="button" onClick={Reg}>Create account</button>
    </form>
    </main>
}