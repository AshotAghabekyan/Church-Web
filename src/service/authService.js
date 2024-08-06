import CryptoService from "./cryptoService.js";


class AuthorizationService {
    #cryptoService;
    constructor() {
        const key = process.env.ENCRYPT_KEY;
        const algorithm = process.env.ENCRYPT_ALGORHITM;
        this.#cryptoService = new CryptoService(key, algorithm);
    }
    

    isPasswordValid(password) {
        try {
            const adminPassword = process.env.ADMIN_PASSWORD;
            if (password != adminPassword) {
                console.log("password not valid");
                return null;
            }
    
            const secretKey = process.env.SECRET_KEY;
            const token = this.createToken(secretKey);
            return token || null;
        }
        catch(error) {
            console.log("auth service error -->", error);
        }
    };

    createToken(credentials) {
        try {
            const token = this.#cryptoService.encrypt(credentials);
            console.log('generated token -_>', token);
            return token || null;
        }
        catch(error) {
            console.log("auth service error -->", error);
        }
    };

    checkToken(token) {
        try {
            const decryptedString = this.#cryptoService.decrypt(token);
            const secretKey = process.env.SECRET_KEY;
            return decryptedString == secretKey;
        }
        catch(error) {
            console.log('auth service error -->', error);
        }
    };
}

export default AuthorizationService;