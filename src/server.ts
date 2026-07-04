import app from "./app.js"
import config from "./config/config.js"

 const main = ()=>{
    app.listen(config.port, ()=>{
        console.log(`Your app is running on port ${config.port}`);
    })
 };
 main();