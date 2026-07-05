import {Pool} from "pg" ;
import config from "../config/config.js"
 
 export const pool = new Pool({
    connectionString: config.connectionString 
 });

 export const initDB = async () =>{
    try {

      await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'contributor',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at  TIMESTAMP DEFAULT NOW()
        ) 
         
         `)

         await pool.query(`
            CREATE TABLE IF NOT EXISTS issues(
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT NOT NULL,
            type VARCHAR(50) NOT NULL,
            status VARCHAR(50) NOT NULL DEFAULT 'open',
            reporter_id INT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
             updated_at  TIMESTAMP DEFAULT NOW()
            )
            
            `)

       console.log("Database connected successfully");
    }
    catch(error){
        console.log('Database err::', error);
    }
 };