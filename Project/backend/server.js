import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';

import machineryRouter from './routes/machinery.routes.js';
import maintainenceRouter from './routes/maintainence.routes.js';
import orderRouter from './routes/prod.routes.js';
import financeRouter from './routes/finance.routes.js';
import transportRouter from './routes/transport.routes.js';
import driverRouter from './routes/driver.routes.js';
import stockRouter from './routes/stock.routes.js';
import damagedStockRouter from './routes/damagedStock.routes.js';
import supplierRouter from './routes/supplierDetails.route.js';

const app = express();
const PORT = process.env.PORT || 8070;

//middlewear
app.use(cors());
app.use(bodyParser.json());
app.use('/machinery', machineryRouter);
app.use('/maintainence', maintainenceRouter);
app.use('/production/order', orderRouter);
app.use('/finance', financeRouter);
app.use('/transport', transportRouter);
app.use('/driver', driverRouter);
app.use('/stock', stockRouter);
app.use('/damagedStock', damagedStockRouter);
app.use('/supplier', supplierRouter);

const URL = process.env.MONGODBURL;

//connect to DB
mongoose.connect(URL);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('mongodb connection is successful!!');
});

app.listen(PORT, () => {
  console.log(`server is up and running on ${PORT}`);
});
