import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
//const dotenv = require("dotenv");  //require dotenv package
dotenv.config({ path: "./config.env" }); //import config.env file

//dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

const DB = process.env.MONGO_URL;  
const Port = process.env.PORT;
const MongoClient = require('mongodb').MongoClient
MongoClient.connect(DB, { usenewurlparser: true, useunifiedtopology: true,})
  .then(() => {console.log("Successfully connected ");})
  .catch((error) => {console.log(`can not connect to database, ${error}`);})


// API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

// ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT || 1000;

app.listen(Port, console.log(`server run in port ${Port}`));
