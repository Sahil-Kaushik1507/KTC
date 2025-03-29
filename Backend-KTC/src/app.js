import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

export const app = express();

//basic middlewares
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(cors())

    
// import routes
import docketRouter from './routes/docket.routes.js';
import addRouter from './routes/add.routes.js';



//route decleration 
app.use('/api/v1/docket',docketRouter);
app.use('/api/v1/add',addRouter);

