import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
export default class Serv{
   
    async GetHeaderData():Promise<{isread:boolean,content:string,newsid:number}[]>{
      const sql:string = 'SELECT n.isread, r.content, r.newsid FROM notifications n JOIN review r ON n.reviewid = r.id WHERE isread = false';
      return (await db.query(sql)).rows;
    }
     ReadNotif(){
        const sql:string = 'UPDATE notifications SET isread = true WHERE isread = false';
        db.query(sql);
    }
}