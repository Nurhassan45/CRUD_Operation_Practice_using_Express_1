import { pool } from "../../DB";
import bcrypt from 'bcrypt';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import config from "../../config";

const loginUserIntoDB = async (payLoad: { name: string, email: string, password: string }) => {
    try {
        const { name, email, password } = payLoad;
        //todo list  
        //1. user exist or not 
        const user = await pool.query(`
    SELECT * FROM users WHERE email=$1
    `, [email]);
        if (user.rows.length === 0) throw new Error('User Not Exist !');

        //2. matchpassword
        const userData = user.rows[0]
        const matchpassword = await bcrypt.compare(password, userData.password);
        if (!matchpassword) throw new Error('Password not matched !');


        //3.give accessToken
        const jwtPayloadData = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role
        }

        const accessToken = jwt.sign(jwtPayloadData, config.jwtSecreat as string, { expiresIn: config.accessTokenExpireTime });
        const refreshToken = jwt.sign(jwtPayloadData, config.jwtRefreshSecreat as string, { expiresIn: config.refreshTokenExpireTime });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log('error from authservice', error);
    }
}

//generate refreshToken
const generateRefreshToken=async(token:string)=>{
    try {
        if(!token) throw new Error('Unauthorize access !');
        //decoded given token .check valid or not
        const decoded= jwt.verify(token,config.jwtRefreshSecreat as string,) as JwtPayload;
        const user= await pool.query(`
          SELECT * FROM users WHERE email=$1  
            `,[decoded.email]);
        const userData=user.rows[0];
       if(!user) throw new Error('User Not Exists !!');
        const{id,name,email,password,role}=userData;
       const jwtPayLoadData={
       id:id,
       name:name,
       email:email,
       password:password,
       role:role,
       }

       const accessToken= jwt.sign(jwtPayLoadData,config.jwtRefreshSecreat as string,{'expiresIn':config.refreshTokenExpireTime});
       return {accessToken};
    } catch (error) {
        
    }
}
const authService = {
    loginUserIntoDB,
    generateRefreshToken
}
export default authService;