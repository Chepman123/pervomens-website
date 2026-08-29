import { Router } from "express"
import AdminService from "../Services/Admin";
import Admin from "../Controllers/Admin";
import middleWare from "../Middleware";

export default()=>{
    const router:Router = Router();
    
    router.use(middleWare);
    const service:AdminService = new AdminService();
    const controller:Admin = new Admin(service);

    router.post('/',(req,res)=>{controller.Send(req,res)});
    router.post('/News',(req,res)=>{controller.News(req,res)});

    return router;
}