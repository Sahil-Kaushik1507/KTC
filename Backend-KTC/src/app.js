import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import errorHandler  from './middlewares/errorHandler.js';

export const app = express();

//basic middlewares
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())
app.use(errorHandler)

    
// App Routing
import appRouter from './appRouter.js'
app.use('/api/v1',appRouter);



