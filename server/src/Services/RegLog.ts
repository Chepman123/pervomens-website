import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
export default class RegLogServ{
    async Reg(username:string,password:string):Promise<{result:RegLogResult,token:string}>{
      let sql:string = "SELECT * FROM players WHERE username = $1";

       if(password.length<6) return {result:"password",token:""};

       if((await (await db.query(sql,[username])).rowCount!=0)) return {result:"username",token:""};

       const hashedPassword = await bcrypt.hash(password,10);

        sql = "INSERT INTO players(username,password) VALUES($1,$2)";
       await db.query(sql,[username,hashedPassword]);

       const token:string = jwt.sign({username:username,role:'customer'},process.env.SECRET!,{expiresIn:'7d'});

       return {result:null,token:token};
    }
    async Login(username:string,password:string):Promise<{result:RegLogResult,token:string}>{
        let sql:string = "SELECT password FROM players WHERE username = $1";
        const result = (await db.query(sql,[username])).rows;
        if(result){
        if(await bcrypt.compare(password,result[0].password)){
            sql = "SELECT role FROM players WHERE username = $1";
            const role:string = (await db.query(sql,[username])).rows[0].role;
            const token:string = jwt.sign({username:username,role:role},process.env.SECRET!,{expiresIn:'7d'});
           return {result:null,token:token};
        }
        else return {result:"password",token:""};
        }
         else return {result:"username",token:""};
    }
}