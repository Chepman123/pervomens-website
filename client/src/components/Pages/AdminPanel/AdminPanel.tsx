import { useState } from "react"
import classes from './AdminPanel.module.scss'
import RoleVerify from "../../RoleVerify/RoleVerify";
import data from '../../../interfaces/GameData'
export default function AdminPanel(){
    const [post,setPost] = useState<string>('');
    const [file,setFile] = useState<null|File|string>();
     const [game,setGame] = useState<number>(0);
   
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


       fetch('http://localhost:5000/AdminPanel',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({post,fileData,index:game}),
        credentials:'include'
       });   
    }
    return <main className={classes.main}>
        <RoleVerify/>
        <h1>Admin panel</h1>
    <textarea onChange={(e)=>{setPost(e.target.value)}} value={post} placeholder="your post"/>
        <div>
        <label htmlFor="file">FILE</label>
    <input className={classes.file} type="file" id='file'onChange={((e)=>{
        const result = e.target.files?.[0]? e.target.files?.[0]:null;
        setFile(result)
    })}/>
    <select onChange={(e)=>{setGame(Number(e.target.value))}}>
            {data.map((game)=>{
                return <option value={game.id} key={game.id}>{game.name}</option>
            })}
        </select>
        </div>
    <button onClick={Send}>➤ Send</button>
    </main>
}