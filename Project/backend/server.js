import express from 'express'
import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser'

import studentRouter from './routes/student.routes.js'

const app = express();
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use("/student", studentRouter);

const URL = process.env.MONGODBURL;

mongoose.connect(URL);
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MDB connection successfull!")
})

app.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`)
})