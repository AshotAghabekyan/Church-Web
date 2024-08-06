import express from "express";
import cors from "cors"
import path from "path";
import videoRouter from "./src/routes/video.js";
import authRouter from "./src/routes/admin.js";

const app = express();
app.use(express.json());
app.use(cors({
    "maxAge": 86400,
    "methods": "GET",
    "origin": "http://localhost:3000"
}));

// app.use((req, res, next) => {
//     res.setHeader("Content-Security-Policy", "default-src *; style-src *; frame-src https://www.youtube.com/");
//     // res.setHeader("Access-Control-Allow-Origin", 'https://church-web.onrender.com;  http//:localhost:3000');
//     next();
// });

app.use("/public", express.static(path.resolve("public")));
app.use("/auth", authRouter);
app.use('/videos', videoRouter);


app.get("/", async function(request, response) {
    response.sendFile(path.resolve("views/home.html"));
    
})

app.get("/church", function(request, response) {
    response.sendFile(path.resolve("views/church.html"));
})

app.get("/our_services", function(request, response) {
    response.sendFile(path.resolve("views/services.html"));
})

app.get("/donation", function(request, response) {
    response.sendFile(path.resolve('views/donate.html'));
})

app.get("/visitUs", function(request, response) {
    response.sendFile(path.resolve('views/visitUs.html'));
})

app.listen(process.env.PORT, function() {
    console.log("server running");
})

