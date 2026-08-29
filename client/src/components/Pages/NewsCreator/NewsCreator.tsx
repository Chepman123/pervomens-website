import { useState } from "react";
import RoleVerify from "../../RoleVerify/RoleVerify";
import classes from '../AdminPanel/AdminPanel.module.scss';
import { data } from "../../../data/gameData";
export default function NewsCreator(){
      const [post,setPost] = useState<string>('');
      const [file,setFile] = useState<null|File|string>();
      const [title,setTitle] = useState<string>('');
      const [game,setGame] = useState<string>('TIA');
        let fileData: string | null = null;
     async function Send(){
        if (file instanceof File) {
    fileData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(file);
    });
  }
       fetch('http://localhost:5000/AdminPanel/News',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({post,title,fileData,game}),
        credentials:'include'
       });   
    }
    return <main className={classes.main}>
        <RoleVerify/>
        <h1>News creator</h1>
        <input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="title"/>
        <textarea onChange={(e)=>{setPost(e.target.value)}} value={post} placeholder="post"/>
            <div>
                  <label htmlFor="file">FILE</label>
    <input id="file" className={classes.input} type="file" onChange={((e)=>{
        const result = e.target.files?.[0]? e.target.files?.[0]:null;
        setFile(result)
    })}/>
    <select onChange={(e)=>{setGame(e.target.value)}}>
        {data.map((game)=>{
            return <option value={game.short} key={game.short}>{game.tittle}</option>
        })}
    </select>
    </div>
    <button onClick={Send}>Send</button>
    </main>
}