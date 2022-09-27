import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";
import bodyParser from "body-parser";


import machineryRouter from "./routes/machinery.routes.js";
import maintainenceRouter from "./routes/maintainence.routes.js";

const app = express();
const PORT = process.env.PORT || 8070;

//middlewear
app.use(cors());
app.use(bodyParser.json());
app.use("/machinery", machineryRouter);
app.use("/maintainence", maintainenceRouter);

const URL = process.env.MONGODB_URL;

//connect to DB
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once("open" , () => {
    console.log("mongodb connection is successful!!");
});

app.listen(PORT, () => {
   console.log(`server is up and running on ${PORT}`);
});