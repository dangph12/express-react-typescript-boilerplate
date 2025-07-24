import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './configs/db';
import router from './routes/router';
import passport from 'passport';
import configurePassport from './utils/passport';
import ApiResponse from './types/api-response';
import errorHandler from './middleware/error-handler';

dotenv.config();

const app = express();
connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
);

configurePassport();
app.use(passport.initialize());

app.use('/api', router);

// Not found handler
app.use((req: Request, res: Response) => {
  const message = `API route [${req.method}] ${req.originalUrl} not found`;
  res.status(404).json(ApiResponse.failed(message));
});

app.use(errorHandler);

export default app;
