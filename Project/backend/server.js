import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import bodyParser from "body-Parser";

import orderRouter from "./routes/prod.routes.js";

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use("/Production/order",orderRouter);

//connecting to db
const url = process.env.MONGODBURL;
mongoose.connect(url);
const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");
});

app.listen(PORT,()=>{
    console.log(`Server is up and running in PORT ${PORT}`);
});

