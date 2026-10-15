import express from 'express';
import { initDB } from './DB';
import userRouter from './modules/User/user.router';
import { authRouter } from './modules/Auth/auth.router';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './middlewire/globalErrorHandler';
import logger from './middlewire/logger';
const app = express();
app.use(express.json());
app.use(logger);

const port = 3000;
app.use(cookieParser());
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use(globalErrorHandler);
initDB();
export default app;