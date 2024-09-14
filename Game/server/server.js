import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import router from './routes/game.js';
import mongoose from 'mongoose' ;

const app = express()

app.use(cors());
app.use(express.json());
config();

const port = process.env.PORT || 8080
app.use((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})
/**routes */
app.use('/api/game',router)

app.get('/',(req, res) =>
{
    try{
        res.json("getreq")
    }catch(error){
        res.json(error)
    }
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port,() =>{
        console.log(`server connected on port ${port} `)
    })
    })
    .catch((error) => {
        console.log(error)
    })
