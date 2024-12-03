
import { google } from "googleapis";
import {OAuth2Client} from "google-auth-library/build/src/auth/oauth2client"
import { Credentials } from "google-auth-library/build/src/auth/credentials";



export class AuthService {
    private oauth2Client: OAuth2Client;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            redirectUri: process.env.GOOGLE_REDIRECT_URL,
        })
    }


    public getAuthUrl(): string {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: process.env.GOOGLE_SCOPES,
        });

        return authUrl;
    }


    async getTokens(queryCode: string): Promise<Credentials> {
        const { tokens: authTokens } = await this.oauth2Client.getToken(queryCode);
        this.oauth2Client.setCredentials(authTokens);
        return authTokens;
    }
}


