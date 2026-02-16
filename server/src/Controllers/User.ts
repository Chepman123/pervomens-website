import User from '../Services/User'
import { Response,Request} from "express";
import jwt from 'jsonwebtoken';

export default class Con{
 constructor (private service:User){}   

  async GetData(req:Request,res:Response){
      res.json(await this.service.GetData(req.params.username));
  }
  async SaveProfile(req:Request,res:Response){
    this.service.SaveProfile(req.body);
    res.status(200);
    res.json({});
  }
}