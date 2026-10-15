import { pool } from "../../DB"
import bcrypt from 'bcrypt';
const postUserIntoDB=async(payload:any)=>{
const{name,email,password}=payload;
const hashPassword=await bcrypt.hash(password,6);
const result= await pool.query(`
    INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *
    `,[name,email,hashPassword]);
return result;
}


const getUserFromDB=async()=>{
    const result = await pool.query(`
       SELECT * FROM users  
        `)
    result.rows.forEach(user=>delete user.password);
    return result;
}

const getUserById=async(id:number)=>{
    const result= await pool.query(`
        SELECT * FROM users WHERE id= $1
        `,[id]);
    delete result.rows[0].password;
    return result;
}

const updateUserById=async(id:number,payLoad:any)=>{
    const{name,email}=payLoad;
    const result = await pool.query(`
       UPDATE users SET name=$1 ,email=$2 WHERE id=$3 RETURNING * 
        `,[name,email,id]);
    return result ;
}

const deleteUserById=async(id:number)=>{
    const result = await pool.query(`
       DELETE FROM users WHERE id=$1 
        `,[id]);
    return result;
}
export const userService={
    postUserIntoDB,
    getUserFromDB,
    getUserById,
    updateUserById,
    deleteUserById
}