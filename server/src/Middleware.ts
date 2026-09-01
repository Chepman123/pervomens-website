import { Request,Response,NextFunction } from "express";
import jwt  from "jsonwebtoken";

export default function middleWare(req: Request, res: Response, next: NextFunction){
   const token = req.cookies.token;
       const data = token?(jwt.verify(token, process.env.SECRET!) as {username:string,role:'customer'|'admin'}):null;
       if(!data) return;
       if(data.role=='customer') return;

       next();
}
export function middleWareIsLogined(req:Request,res:Response,next:NextFunction){
    if(req.cookies.user.token==null)return;

    next();
}