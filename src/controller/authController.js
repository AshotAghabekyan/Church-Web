import AuthorizationService from "../service/authService.js";



class AuthorizationController {
    #authService;

    constructor() {
        this.#authService = new AuthorizationService();
    }

    isAuthorized(req, res, next) {
        try {
            const authToken = req.headers.authorization?.split(" ")[1];
            if (!authToken) {
                return res.status(401).json({message: "authorization token required!"});
            }
    
            const isValidAuth = this.#authService.checkToken(authToken);
    
            if (!isValidAuth) {
                return res.status(401).json({message: "invalid token"});
            }
    
            next();
        }
        catch(error) {
            res.status(500).json({message: 'server internal error'});
            console.log('authorization controller error -->', error);
        }
    };


    adminAuth(req, res) {
        try {
            const password = req.body.password;

            const isValidPassword = this.#authService.isPasswordValid(password);
            if (!isValidPassword) {
                return res.status(400).json({message: 'invalid password'});
            }
    
            const credentials = process.env.SECRET_KEY;
            const encryptedToken = this.#authService.createToken(credentials);
            res.status(200).json({token : encryptedToken});
        }
        catch(error) {
            res.status(500).json({message: 'server internal error'});
            console.log('authorization controller error -->', error);
        }
    };
}


export default new AuthorizationController();