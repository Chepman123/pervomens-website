import { Response,Request, Router } from "express";
import Serv from "../Services/User";
import Con from "../Controllers/User";
export default()=>{
   const router:Router = Router();
     
   const service:Serv = new Serv();
   const controller:Con = new Con(service);

   router.get("/:username",(req:Request,res:Response)=>controller.GetData(req,res));
   router.put("/:username",(req:Request,res:Response)=>controller.SaveProfile(req,res));

   return router;
}