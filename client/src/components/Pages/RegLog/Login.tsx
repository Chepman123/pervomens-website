import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegLog.module.scss";
import type { RegLogResult } from "../../../interfaces/LogReg";
import BackGround from "../../BackGround/BackGround";
export default function Login(){
    const navigate = useNavigate();
    const [username,setUsername] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [result,setResult] = useState<RegLogResult>(null);
    async function Login(){
           const response = await fetch("http://localhost:5000/Login",{
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify({username:username,password:password}),
            credentials: 'include'
           })
           const result:RegLogResult = await response.json();
           setResult(result);
           if(result == null) navigate("/");
        }

    return <main className={classes.main}>
       <BackGround/>
    <form className={classes.form}>
        <h1>Log in</h1>
        <input type="text" placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <input type="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <Link to={"/Reg"}>Create account</Link>
        {
            result != null &&<p>{result=="username"?"username doesn't exist":"password is incorrect"}</p>
        }
        <button type="button" onClick={Login}>Log in</button>
    </form>
    </main>
}