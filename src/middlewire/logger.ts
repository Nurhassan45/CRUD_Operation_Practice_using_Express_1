import type { NextFunction, Request, Response } from "express";
import fs from 'fs';
const logger=(req:Request,res:Response,next:NextFunction)=>{
    const log=`\n URl-> ${req.url} Method->${req.method}\n`;
    fs.appendFile('logger.txt',log,err=>console.log(err));
    next();
}
export default logger;