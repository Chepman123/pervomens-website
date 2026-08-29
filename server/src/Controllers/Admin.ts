import { Request, Response } from "express";
import AdminService from "../Services/Admin";

export default class Admin{
    constructor(private service:AdminService){}
    Send(req:Request,res:Response) {
        this.service.Send(req.body.post,req.body.fileData,req.body.index);
    }
    News(req:Request,res:Response){
        this.service.News(req.body.post,req.body.title,req.body.fileData,req.body.game)
    }
}