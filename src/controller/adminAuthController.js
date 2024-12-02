import path from "path";


export class AdminAuthController {


    index(req, res) {
        try {
            return res.sendFile(path.resolve("public/pages/admin-auth/admin-auth.html"));
        } catch(error) {
            console.log("cannot send html file -->", error);
            return res.status(500).json({message: "server internal error"});
        }
    }


    authorization(req, res) {
        return res.status(200).json({token: 'ferffwfwfewfew'})
    } 
}