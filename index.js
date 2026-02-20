import express from "express";
import bootstrap from "./src/app.controller.js"
import db_connect from "./src/DB/DB.connect.js";
//create server 
const app =express();
//call db_connect
db_connect();
// function of bootstrap to print end.points
bootstrap(app,express);
// create port of server
const port = 3000;
// listen of conncet server
app.listen(port,()=>{
    console.log(`server is running at port : ${port}`)
})
