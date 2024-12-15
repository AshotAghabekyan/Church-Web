// deno-lint-ignore-file
import express from "express";
import cors from "cors";
import path from "node:path";
import videoApiRouter from "./modules/video/videoApiRoutes.ts";
import adminApiRouter from "./modules/admin/adminAuthRoute.ts";
import authApiRouter from "./modules/auth/authRoute.ts";
import { Request, Response, Express } from "express";



// process.loadEnvFile(path.resolve('.env'));

const app: Express = express();
app.use(express.json());
app.use(cors());


// app.use(function(req: Request, res: Response) {
//     res.setHeader('Cache-Control', "no-cache public max-age=60")
// })




app.use("/public", express.static(path.resolve("public")));
app.use('/videos', videoApiRouter)
app.use("/admin-auth", adminApiRouter);
app.use('/auth', authApiRouter);

app.get("/", function(request: Request, response: Response) {
    response.sendFile(path.resolve("public/pages/home/home.html"));
})

app.get("/church", function(request: Request, response: Response) {
    response.sendFile(path.resolve("public/pages/church/church.html"));
})

app.get("/our_services", function(request: Request, response: Response) {
    response.sendFile(path.resolve("public/pages/services/services.html"));
})

app.get("/donation", function(request: Request, response: Response) {
    response.sendFile(path.resolve('public/pages/donate/donate.html'));
})

app.get("/visitUs", function(request: Request, response: Response) {
    response.sendFile(path.resolve('public/pages/visitUs/visitUs.html'));
})

app.listen(Deno.env.get('PORT'), function() {
    console.log("server running");
})

