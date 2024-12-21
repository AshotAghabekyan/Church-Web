import express from "express";
import * as exphbs from "express-handlebars";
import cors from "cors";
import path from "node:path";
import videoApiRouter from "./src/modules/video/videoApiRoutes";
import adminApiRouter from "./src/modules/admin/adminAuthRoute"
import authApiRouter from "./src/modules/auth/authRoute"
import { Request, Response, Express } from "express";
import { StaticFileProcessor } from "./src/modules/staticFileProcessor/staticFIleProcessor";
import { BrotliCompressor } from "./src/modules/compressor/compressor";


process.loadEnvFile(path.resolve('.env'));
const app: Express = express();


app.use(express.json());
app.use(cors());

app.use('/public', async (req: Request, res: Response) => {
    const staticFileProcessor: StaticFileProcessor = new StaticFileProcessor(req.url, {
        "staticFilesDir": path.resolve('/public'),
        compress: {
            compressor: new BrotliCompressor(),
            encoding: "br",
            
        },
    });
    await staticFileProcessor.process(req, res);
})



app.set('views', path.resolve('public/pages')); 
app.set('view engine', 'hbs');

app.engine(
    'hbs',
    exphbs.engine({
      defaultLayout: false, 
      extname: '.hbs',
      partialsDir: [
        path.resolve('public/common/header'),
        path.resolve('public/common/footer')
      ],
    })
);
  

app.use('/videos', videoApiRouter)
app.use("/admin-auth", adminApiRouter);
app.use('/auth', authApiRouter);

app.get("/", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/home/home.hbs'))
})

app.get("/church", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/church/church.hbs'))
})

app.get("/our_services", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/services/services.hbs'));

})

app.get("/donation", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/donate/donate.hbs'));

})

app.get("/visitUs", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/visitUs/visitUs.hbs'));

})


app.listen(process.env.PORT, function() {
    console.log("server running on", process.env.PORT);
})

