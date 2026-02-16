import db from "../db";
import bcrypt from 'bcrypt';
import { RegLogResult } from "../Interfaces/LogReg";
import jwt from "jsonwebtoken";
import { User } from "../Interfaces/User";
export default class Serv{
    async GetData(username:string):Promise<User|null> {
        const Tia = await (await db).db("Tia");
        const players = Tia.collection<User>("Players");
        const result = await players.findOne({username:username},{projection:{_id:0}});
        return result;
    }
    async SaveProfile(user:User){
        const Tia = await (await db).db("Tia");
        const players = Tia.collection("Players");
        await players.updateOne({username:user.username},{$set:{description:user.description,avatar:user.avatar}});
    }
}