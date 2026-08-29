import Main from '../Services/Main'
import { Response,Request} from "express";
import jwt from 'jsonwebtoken';

export default class Con{
 constructor (private service:Main){}   

  async GetDataHeader(req:Request,res:Response){
    const token = req.cookies.token;
    const user = token?(jwt.verify(token, process.env.SECRET!) as {username:string,role:string}):null;
    const notifications = await this.service.GetHeaderData();
    res.json({user,notifications});
 }
 async ReadNotif(){
  this.service.ReadNotif();
 }
}