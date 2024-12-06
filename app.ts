import express from "express";
import cors from "cors"
import path from "path";
import videoApiRouter from "./src/modules/video/videoApiRoutes";
import adminApiRouter from "./src/modules/admin/adminAuthRoute"
import authApiRouter from "./src/modules/auth/authRoute"
import { Request, Response, Express } from "express";

process.loadEnvFile(path.resolve('.env'));


const app: Express = express();
app.use(express.json());
app.use(cors());


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


app.listen(process.env.PORT, function() {
    console.log("server running");
})

