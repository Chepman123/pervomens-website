import NewsService from "../Services/News";
import { Response,Request} from "express";
import jwt from 'jsonwebtoken';
export default class NewsController{
    constructor(private service:NewsService){}
    async GetNews(req:Request,res:Response){
    const result = await this.service.GetNews();
    res.json(result);
 }
 async GetLastNews(req:Request,res:Response){
   const result = await this.service.GetLastNews();
    res.json(result);
 }
 async GetNewsById(req:Request,res:Response){
   const result = await this.service.GetNewsById(req.params.newsId);
    res.json(result);
 }
 async SendReview(req:Request,res:Response){
   const token = req.cookies.token;
     const data = token?(jwt.verify(token, process.env.SECRET!) as {username:string,role:string}):null;
     if(data==null)return;
     this.service.SendReview(req.params.newsId,req.body.review,data.username);
 }
 
}