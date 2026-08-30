import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleVerify(){
    const navigate = useNavigate();
     async function GetData() {
        const response = await fetch("https://pervomens-website-2.onrender.com", {
  method: 'GET',
  credentials: 'include', 
});
const result:{user:{username:string,role:'customer'|'admin'},notifications:Notification[]} = await response.json();
        if(result.user.role != 'admin')  navigate('/');
    }
    useEffect(()=>{
         GetData();
    })
    return <></>
}