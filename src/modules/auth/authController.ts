import { AuthService } from "./authService";
import {Request, Response} from "express";
import { Credentials } from "google-auth-library/build/src/auth/credentials";


export class AuthController {
    private authService: AuthService = new AuthService();

    public async authenticate(req: Request, res: Response): Promise<void> {
        try {
            const authUrl: string = this.authService.getAuthUrl();
            if (!authUrl) {
                throw new Error('INTERNAL SERVER ERROR');
            }
            res.status(301).redirect(authUrl);
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: error});
        }
    } 


    async authCallback(req: Request, res: Response): Promise<void> {
        try {
            const authQueryCode: string = req.query.code as string;
            const tokens: Credentials = await this.authService.getTokens(authQueryCode);
            if (!tokens) {
                res.status(401).json({message: "NOT AUTHORIZED"});
                return;
            }
            res.status(200).json(tokens);
        }
        catch(error) {
            console.error(error);
            res.status(500).json({message: 'INTERNAL SERVER ERROR'});
        }
    }
}