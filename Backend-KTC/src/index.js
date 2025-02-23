import 'dotenv/config'
import {connectToDatabase} from '../src/db/index.js'
import { app } from './app.js';

connectToDatabase()
.then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`Server started at ${process.env.PORT}`)
  })
})
.catch((error)=>{
console.error("Database Not Connected", error);
})