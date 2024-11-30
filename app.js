import express from "express";
import cors from "cors"
import path from "path";
import videoRouter from "./src/routes/videoApiRoute.js"
import authRouter from "./src/routes/authRoute.js"

const app = express();
app.use(express.json());
app.use(cors({
    "maxAge": 86400,
    "methods": "GET",
    "origin": "http://localhost:3000"
}));


app.use("/public", express.static(path.resolve("public")));
app.use('/videos', videoRouter)
app.use("/admin-auth", authRouter);


app.get("/", function(request, response) {
    response.sendFile(path.resolve("public/views/home.html"));
})

app.get("/church", function(request, response) {
    response.sendFile(path.resolve("public/views/church.html"));
})

app.get("/our_services", function(request, response) {
    response.sendFile(path.resolve("public/views/services.html"));
})

app.get("/donation", function(request, response) {
    response.sendFile(path.resolve('public/views/donate.html'));
})

app.get("/visitUs", function(request, response) {
    response.sendFile(path.resolve('public/views/visitUs.html'));
})

app.listen(process.env.PORT, function() {
    console.log("server running");
})

