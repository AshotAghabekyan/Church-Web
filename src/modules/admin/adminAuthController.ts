import path from "path";
import {Request, Response} from "express";



export class AdminAuthController {

    public adminAuthPage(req: Request, res: Response) {
        try {
            res.sendFile(path.resolve("public/pages/admin-auth/admin-auth.html"));
        } catch(error) {
            console.log("cannot send html file -->", error);
            res.status(500).json({message: "server internal error"});
        }
    }


    public authorization(req: Request, res: Response) {
        res.status(200).json({token: 'ferffwfwfewfew'})
    } 
}