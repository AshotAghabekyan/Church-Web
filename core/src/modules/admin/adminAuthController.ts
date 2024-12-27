// deno-lint-ignore-file
import path from "node:path";
import {Request, Response} from "express";



export class AdminAuthController {

    public adminAuthPage(req: Request, res: Response): void {
        try {
            res.render(path.resolve('public/pages/admin-auth/admin-auth.hbs'));
        } catch(error) {
            console.log("cannot send html file -->", error);
            res.status(500).json({message: "server internal error"});
        }
    }


    public authorization(req: Request, res: Response): void {
        res.status(200).json({token: 'ferffwfwfewfew'})
    } 
}