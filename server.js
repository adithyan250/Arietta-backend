import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/mongoDB.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import job from './config/cronJob.js'

// App Config 

const app = express();

const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();

// middlewares
app.use(express.json())
app.use(cors())

job.start();

// cron job

app.get("/api/health",(req, res) => {
    console.log("Cron Request Recieved");
    res.status(200).json({status: "ok"});
});

// Api End Points

app.use('/api/user', userRouter);

app.use('/api/product', productRouter);

app.use('/api/cart', cartRouter);

app.use('/api/order', orderRouter)


app.get('/',(req, res)=>{
    res.send("Api working")
});

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`);
    
});
