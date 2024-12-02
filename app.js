import express from "express";
import cors from "cors"
import path from "path";
import videoRouter from "./src/routes/videoApiRoute.js"
import authRouter from "./src/routes/authRoute.js"
import adminAuthRouter from "./src/routes/adminAuthRoute.js"


process.loadEnvFile(path.resolve('.env'));


const app = express();
app.use(express.json());
app.use(cors({
    "maxAge": 86400,
    "methods": "GET",
    "origin": "http://localhost:3000"
}));


app.use("/public", express.static(path.resolve("public")));
app.use('/videos', videoRouter)
app.use("/admin-auth", adminAuthRouter);
app.use('/auth', authRouter);

app.get("/", function(request, response) {
    response.sendFile(path.resolve("public/pages/home/home.html"));
})

app.get("/church", function(request, response) {
    response.sendFile(path.resolve("public/pages/church/church.html"));
})

app.get("/our_services", function(request, response) {
    response.sendFile(path.resolve("public/pages/services/services.html"));
})

app.get("/donation", function(request, response) {
    response.sendFile(path.resolve('public/pages/donate/donate.html'));
})

app.get("/visitUs", function(request, response) {
    response.sendFile(path.resolve('public/pages/visitUs/visitUs.html'));
})


// app.post("/testing/video/:id/like", async (req, res) => {
//     const videoId = req.params.id;
//     const tokens = req.cookies.tokens;
//     console.log(tokens);
// })



app.listen(process.env.PORT, function() {
    console.log("server running");
})

