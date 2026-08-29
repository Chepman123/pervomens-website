import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
export default class NewsService{
     async GetNews(){
        const sql:string = "SELECT * FROM news ORDER BY createdat DESC";
        const result = (await db.query(sql)).rows;
        return result;
    }
    
    async GetNewsById(id:string){
        let sql:string = 'SELECT * FROM news WHERE id = $1';
        const news = (await db.query(sql,[id])).rows[0];
        sql = 'SELECT r.*,p.avatar FROM review r JOIN players p ON r.createdby = p.username WHERE newsid = $1'
        const reviews = ((await db.query(sql,[id])).rows);
        return {news:news,reviews:reviews};
    }
    async SendReview(id:string,review:string,username?:string){

        const sql:string = 'INSERT INTO review(content,createdat,createdby,newsid) VALUES($1,$2,$3,$4) RETURNING id';
        const result = await db.query(sql,[review,new Date(),username,id]);
        this.SendNotification((await result).rows[0].id);
    }
    async SendNotification(id:string,username?:string){
       let sql:string = 'SELECT role FROM players WHERE username = $1'
       const result = db.query(sql,[username]);
       if((await result).rows[0].role == 'admin') return;
        sql = 'INSERT INTO notifications(reviewid) VALUES($1)';
        db.query(sql,[id]);
    }
    async GetLastNews(){
        const sql:string = "SELECT * FROM news ORDER BY createdat DESC LIMIT 5";
        const result = (await db.query(sql)).rows;
        return result;
    }
   
}