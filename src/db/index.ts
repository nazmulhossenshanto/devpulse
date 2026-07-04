import {Pool} from "pg" ;
import config from "../config/config.js"
 
 export const pool = new Pool({
    connectionString: config.connectionString 
 });

 export const initDB = async () =>{
    try {
       console.log("Database connected successfully");
    }
    catch(error){
        console.log('Database err::', error);
    }
 };