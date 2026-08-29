import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoleVerify(){
    const navigate = useNavigate();
     async function GetData() {
        const response = await fetch("https://pervomens-website-2.onrender.com", {
  method: 'GET',
  credentials: 'include', 
});
const result:{username:string,role:'customer'|'admin'} = await response.json();
        if(result.role == 'customer')  navigate('/');
    }
    useEffect(()=>{
         GetData();
    })
    return <></>
}