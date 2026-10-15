import type { NextFunction, Request, Response } from "express";
import type { RoleType } from "../Types/userRole";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { pool } from "../DB";
import { ResMsg } from "../Utility/ResMsg";
import config from "../config";
export const auth=(...roles:RoleType[])=>{
return async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers.authorization;
  
        if(!token) ResMsg(res,201,false,'Unauthorize access!!');
        const decodedUserData= jwt.verify(token as string,config.jwtRefreshSecreat as string) as JwtPayload;
        if(!decodedUserData) ResMsg(res,201,false,'Invalid Token !!');
        const UserData= await pool.query(`
            SELECT * FROM users WHERE email=$1
            `,[decodedUserData.email]);
        if(UserData.rows.length===0) ResMsg(res,201,false,'User not Exists !!');
        const user=UserData.rows[0];
        if(roles.length&&!roles.includes(user.role)) ResMsg(res,201,false,'Not allowed for this role !!');
        req.user=decodedUserData;
        next();
    } catch (error:any) {
        console.log('error from auth middlewire',error.message)
    }

}
}

