import { Response,Request, Router } from "express";
import Serv from '../Services/News';
import Con from '../Controllers/News';
export default()=>{
    const router:Router = Router();
       const service:Serv = new Serv();
       const controller:Con = new Con(service);
   router.get("/",(req:Request,res:Response)=>controller.GetNews(req,res));
   router.get("/Main",(req:Request,res:Response)=>controller.GetLastNews(req,res));
   router.get("/:newsId",(req:Request,res:Response)=>controller.GetNewsById(req,res));
   router.post("/:newsId",(req:Request,res:Response)=>controller.SendReview(req,res));
    return router;
}