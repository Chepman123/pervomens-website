import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
export default class RegLogServ{
    async Reg(username:string,password:string):Promise<{result:RegLogResult,token:string}>{
       const tia = await(await db).db("Tia");
       const players = tia.collection("Players");

       if(password.length<6) return {result:"password",token:""};

       if(await players.findOne({username:username})) return {result:"username",token:""};

       const hashedPassword = await bcrypt.hash(password,10);
       await players.insertOne({username:username,password:hashedPassword});

       const token:string = jwt.sign({username:username},process.env.SECRET!,{expiresIn:'7d'});

       return {result:null,token:token};
    }
    async Login(username:string,password:string):Promise<{result:RegLogResult,token:string}>{
        const tia = await(await db).db("Tia");
        const players = tia.collection("Players");
        const result = await players.findOne({username:username},{projection:{password:1,_id:0}});
        if(result){
        if(await bcrypt.compare(password,result.password)){
            const token:string = jwt.sign({username:username},process.env.SECRET!,{expiresIn:'7d'});
           return {result:null,token:token};
        }
        else return {result:"password",token:""};
        }
         else return {result:"username",token:""};
    }
}