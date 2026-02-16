import { Response,Request, Router } from "express";
import RegLogServ from "../Services/RegLog";
import RegLogCon from "../Controllers/RegLog";
export default()=>{
   const router:Router = Router();
     
   const service:RegLogServ = new RegLogServ();
   const controller:RegLogCon = new RegLogCon(service);

   router.post("/Reg",(req:Request,res:Response)=>controller.Reg(req,res));
   router.post("/Login",(req:Request,res:Response)=>controller.Login(req,res));

   return router;
}