import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
import { User } from "../Interfaces/User";
export default class Serv{
    async GetData(username:string):Promise<User|null> {
        const sql:string = "SELECT username, description, avatar FROM players WHERE username = $1";
        const result = (await db.query(sql,[username])).rows;
        return result[0];
    }
    async SaveProfile(user:User){
        const sql:string = "UPDATE players SET description = $1, avatar = $2 WHERE username = $3";
        db.query(sql,[user.description,user.avatar,user.username]);
        //await players.updateOne({username:user.username},{$set:{description:user.description,avatar:user.avatar}});
    }
}