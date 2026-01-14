import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';
import adminRoutes from './routes/adminRoutes.js';
import cookieParser from 'cookie-parser';
import startCronFunction from './controller/deleteReservation.js';
import apiRoutes from './routes/api.js'
import cors from 'cors';
import { requireAuth } from './middleware/requireAuth.js';
import errorHandler from './middleware/errorHandler.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const dbUri = process.env.DB_URI ||  'mongodb://localhost:27017/booking-system';

const adminPath = "/admin";

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());


app.use(cors({
    origin : process.env.FRONTEND_URL  || 'http://localhost:5173',
    methods: ['GET' , 'POST' , 'PUT' , 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}))



mongoose.connect(dbUri)
        .then(() => {
                console.log('SUCCESFULLY CONNECTED TO DATABASE')
                app.listen(PORT , () => {console.log('APP IS LISTENING AT PORT ' + PORT)})
        })
        .catch((err) => {console.log(err.message)});


startCronFunction();

app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, private'
  );
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});

app.get('/' , requireAuth , (req , res) => {
        res.json({success : true , cookies : true})
})

app.use(adminPath , adminRoutes);
app.use('/api' , apiRoutes)
app.use('/' , authRoutes);
app.use(errorHandler);


