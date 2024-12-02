
import { google } from "googleapis";




export class AuthService {
    #oauth2Client;

    constructor() {
        console.log(process.env.GOOGLE_REDIRECT_URL);
        this.#oauth2Client = new google.auth.OAuth2({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URL,
        })
    }


    getAuthUrl() {
        const authUrl = this.#oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: process.env.GOOGLE_SCOPES,
        });

        return authUrl;
    }


    async getTokens(queryCode) {
        const { tokens: authTokens } = await this.#oauth2Client.getToken(code);
        await oauth2Client.setCredentials(authTokens);
        return authTokens;
    }
}


