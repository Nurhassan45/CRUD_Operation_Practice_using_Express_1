import {Pool} from 'pg';
import config from '../config';
export const pool = new Pool({
  connectionString: config.connectionString
});

export const initDB=async()=>{
    try {
        await pool.query(`
         
           CREATE TABLE IF NOT EXISTS users(
           id SERIAL PRIMARY KEY,
           name VARCHAR(30),
           email VARCHAR(50) UNIQUE NOT NULL,
           password TEXT NOT NULL,
           bio TEXT,
           role VARCHAR(10) DEFAULT 'user',
           create_at TIMESTAMP DEFAULT NOW(),
           updated_at TIMESTAMP DEFAULT NOW()
           ) 
          
            `)
             console.log('Successfully Connected DB');
    } catch (error) {
        console.log('error from DB',error)
    }
}