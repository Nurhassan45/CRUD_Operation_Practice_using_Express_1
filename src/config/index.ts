import dotenv from 'dotenv';
import type { SignOptions } from 'jsonwebtoken';
import path from 'path';
dotenv.config({
    path:path.join(process.cwd(),'.env')
})
const config ={
    connectionString:process.env.CONNECTION_STRING ,
    jwtSecreat:process.env.JWTSECREAT,
    jwtRefreshSecreat:process.env.JWTREFRESHSECREAT,
      accessTokenExpireTime:
    process.env.ACCESSTOKENEXPIRETIME as NonNullable<SignOptions["expiresIn"]>,

  refreshTokenExpireTime:
    process.env.REFRESHTOKENEXPIRETIME as NonNullable<SignOptions["expiresIn"]>,

}

export default config;