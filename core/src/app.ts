// deno-lint-ignore-file
import express from "express";
import * as exphbs from "express-handlebars";
import cors from "cors";
import path from "node:path";
import videoApiRouter from "./modules/video/videoApiRoutes.ts";
import adminApiRouter from "./modules/admin/adminAuthRoute.ts"
import authApiRouter from "./modules/auth/authRoute.ts";
import { Request, Response, Express } from "express";
import { StaticFileProcessor } from "./modules/staticFileProcessor/staticFIleProcessor.ts";
import { BrotliCompressor } from "./modules/compressor/compressor.ts";
import { globSync } from "npm:glob";
import { NotFoundException } from "./modules/exceptionFilter/httpExceptions.ts";
import { ExceptionFilter } from "./modules/exceptionFilter/exceptionFilter.ts";

const app: Express = express();


app.use(express.json());
app.use(cors({
    "credentials": true,
    "origin": "*",
}));

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

const hbsPartialPaths: string[] = globSync([
    path.resolve("./public/pages/**/"),
    path.resolve('./public/common/**/')
])

app.engine(
    'hbs',
    exphbs.engine({
      defaultLayout: false, 
      extname: '.hbs',
      partialsDir: hbsPartialPaths
    })
);
  

app.use('/videos', videoApiRouter)
app.use("/admin-auth", adminApiRouter);
app.use('/auth', authApiRouter);


app.get('/error', function(req: Request, res: Response) {
    throw new NotFoundException('not found test');
})

app.get("/", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/home/home.hbs'))
})

app.get("/church", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/church/church.hbs'))
})

app.get("/our_services", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/services/services.hbs'));

})

// app.get("/donation", function(request: Request, response: Response) {
//     response.render(path.resolve('public/pages/donate/donate.hbs'));
// })

app.get("/visitUs", function(request: Request, response: Response) {
    response.render(path.resolve('public/pages/visitUs/visitUs.hbs'));
})



app.use(ExceptionFilter.catch)


app.use(function(request: Request, response: Response) {
    response.status(404).render(path.resolve('public/common/exception/exception.hbs'), {
        title: '404 - Page Not Found',
        errorCode: 404,
        errorMessage: "The Page Not Found"
    });
})



app.listen(Deno.env.get('PORT'), function() {
    console.log("server running");
})

