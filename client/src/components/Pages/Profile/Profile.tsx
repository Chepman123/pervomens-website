import { useNavigate, useParams } from "react-router-dom";
import userIcon from '../../../../public/User.png'
import { useEffect, useState } from "react";
import type { User } from "../../../interfaces/User";
import classes from './Profile.module.scss'
import BackGround from "../../BackGround/BackGround";
export default function Profile(){
    const navigate = useNavigate()
    const {username} = useParams();
    const[editMode,setEditMode] = useState<boolean>(false);
    const[user,setUser] = useState<User>({username:username!,description:"",avatar:""});
    async function GetInfo() {
        const response = await fetch(`https://pervomens-website-2.onrender.com/profile/${username}`);
        setUser(await response.json())
    }

async function SaveProfile() {
  if (!user) return;

  let avatarData: string | null = null;

  if (user.avatar instanceof File) {
    avatarData = await new Promise<string | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(null);
      reader.readAsDataURL(user.avatar);
    });
  }

  await fetch(`https://pervomens-website-2.onrender.com/profile/${username}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username,
      description: user.description,
      avatar: avatarData?avatarData:user.avatar,
    }),
  });

  setEditMode(false);
  navigate(0);

}


    useEffect(()=>{
    GetInfo();
    },[])
    return<><main className={classes.main}>
      <BackGround/>
        <div className={classes.div}>
        {!editMode&&
        <div>
            <img src={user?.avatar?user.avatar:userIcon}/>
            <div className={classes.desc}>
            <h1>{username}</h1>
            <p>{user?.description}</p>
            <button onClick={()=>setEditMode(true)}>Edit profile</button>
            </div>
        </div>}
        {editMode&&
        <div> 
          <label htmlFor="avatar">Set avatar</label>
            <input
  type="file" className={classes.input} name="avatar" id="avatar"
  onChange={(e) => {
    const file = e.target.files?.[0] ?? null;
    setUser(prev => prev ? { ...prev, avatar: file } : prev);
  }}
/>

           <textarea
           className={classes.textarea}
  placeholder="description"
  value={user?.description ?? ""}
  onChange={(e) =>
    setUser(prev =>
      prev ? { ...prev, description: e.target.value } : prev
    )
  }
/>
            <button onClick={SaveProfile}>Save</button>
        </div>}
   </div> </main></>
}