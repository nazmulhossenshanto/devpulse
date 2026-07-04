import app from "./app.js"
import config from "./config/config.js"
import { initDB } from "./db/index.js";

 const main = ()=>{
    initDB();
    app.listen(config.port, ()=>{
        console.log(`Your app is running on port ${config.port}`);
    })
 };
 main();