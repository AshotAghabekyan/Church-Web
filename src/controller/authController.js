import { AuthService } from "../service/authService.js";


export class AuthController {
    #authService = new AuthService();

    async authenticate(req, res) {
        const authUrl = this.#authService.getAuthUrl();
        if (!authUrl) {
            return res.status(500).json({message: 'INTERNAL SERVER ERROR'});
        }

        return res.status(301).redirect(authUrl);
    } 


    async authCallback(req, res) {
        const authQueryCode = req.query.code;
        const { tokens: authTokens } = await oauth2Client.getToken(authQueryCode);
        if (!authTokens) {
            return res.status(401).json({message: "NOT AUTHORIZED"});
        }
        oauth2Client.setCredentials(authTokens);
        return res.status(200).json(authTokens);
    }
}