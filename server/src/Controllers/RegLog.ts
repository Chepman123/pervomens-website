import RegLog from "../Services/RegLog";
import { Response,Request} from "express";
export default class RegLogCon{
 constructor (private service:RegLog){}   

  async Reg(req:Request,res:Response) {
    const result = await this.service.Reg(req.body.username,req.body.password);
    
      res.cookie('token',result.token,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge:7*24*60*60*1000
            })
      res.json(result.result);
 }
  async Login(req:Request,res:Response) {
    const result = await this.service.Login(req.body.username,req.body.password);
     res.cookie('token',result.token,{
                httpOnly:true,
                secure:true,
                sameSite:'strict',
                maxAge:7*24*60*60*1000
            })
    res.json(result.result);
     
 }
}