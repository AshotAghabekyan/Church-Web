// deno-lint-ignore-file

import { google } from "googleapis";
import {OAuth2Client, Credentials} from "google-auth-library"



export class AuthService {
    private oauth2Client: OAuth2Client;

    constructor() {
        this.oauth2Client = new google.auth.OAuth2({
            clientId: Deno.env.get('GOOGLE_CLIENT_ID'),
            clientSecret: Deno.env.get('GOOGLE_CLIENT_SECRET'),
            redirectUri: Deno.env.get('GOOGLE_REDIRECT_URL'),
        })
    }


    public getAuthUrl(): string {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: Deno.env.get('GOOGLE_SCOPES'),
        });

        return authUrl;
    }


    async getTokens(queryCode: string): Promise<Credentials> {
        const { tokens: authTokens } = await this.oauth2Client.getToken(queryCode);
        this.oauth2Client.setCredentials(authTokens);
        return authTokens;
    }
}


