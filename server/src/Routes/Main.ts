import { Response,Request, Router } from "express";
import Serv from "../Services/Main";
import Con from "../Controllers/Main";
export default()=>{
   const router:Router = Router();
     
   const service:Serv = new Serv();
   const controller:Con = new Con(service);

   router.get("/",(req:Request,res:Response)=>controller.GetDataHeader(req,res));
   router.patch("/",(req:Request,res:Response)=>controller.ReadNotif());
   return router;
}