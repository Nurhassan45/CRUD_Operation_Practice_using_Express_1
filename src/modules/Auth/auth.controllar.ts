import type { Request, Response } from "express";
import authService from "./auth.service";
import { ResMsg } from "../../Utility/ResMsg";
import type { JwtPayload } from "jsonwebtoken";

const loginUser=async(req:Request,res:Response)=>{
    try {
        const result = await authService.loginUserIntoDB(req.body) as JwtPayload;
        const {refreshToken}=result;
        res.cookie('refreshToken',refreshToken,{
            secure:false,
            httpOnly:true,
            sameSite:"lax"
        })
      
        ResMsg(res,200,true,'Successfull Operation',result);

    } catch (error:any) {
        ResMsg(res,400,false,'unSuccessfull Operation');
        
    }
}

const refreshToken= async(req:Request,res:Response)=>{
   try {
     const token = req.cookies.refreshToken;
     const result = await authService.generateRefreshToken(token);
     ResMsg(res,200,true,'operation successfully',result);
   } catch (error) {
     ResMsg(res,400,false,'unSuccessfull Operation');
   }
    
}

const authControllar={
    loginUser,
    refreshToken
}

export default authControllar;