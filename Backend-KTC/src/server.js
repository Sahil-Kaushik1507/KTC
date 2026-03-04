import 'dotenv/config'
import {connectToDatabase} from './config/db.js'
import { app } from './app.js';
import {setupDatabase} from './database/index.js'

const startServer = async () => {
  try{
     await connectToDatabase()
    //  await setupDatabase()
    app.listen(process.env.PORT||8000,()=>{
      console.log(`Server started at ${process.env.PORT}`)
    })
     } catch (error) {
    console.error("Startup failed:", error);
  }
  }

startServer();