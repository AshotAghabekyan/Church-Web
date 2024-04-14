import express from "express";
import cors from "cors"
import path from "path";
import videoRouter from "./videos.js"


const app = express();
app.use(express.json());
app.use(cors());
app.use("/public", express.static(path.resolve("public")));
app.use('/videos', videoRouter)


app.get("/", function(request, response) {
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

