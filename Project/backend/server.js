import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv/config';
import bodyParser from 'body-parser';

import machineryRouter from './routes/machinery.routes.js';
import maintainenceRouter from './routes/maintainence.routes.js';
import maintainenceMachineRouter from './routes/maintainenceMachine.routes.js';
import maintainenceVehicleRouter from './routes/maintainenceVehicle.routes.js';
import orderRouter from './routes/prod.routes.js';
import financeRouter from './routes/finance.routes.js';
import transportRouter from './routes/transport.routes.js';
import driverRouter from './routes/driver.routes.js';
import stockRouter from './routes/stock.routes.js';
import stockUtilisationRouter from './routes/stockUtilisation.routes.js';
import pendingStockRouter from './routes/pendingStock.routes.js';
import supplierRouter from './routes/supplierDetails.route.js';
import purchaseOrderRouter from './routes/purchaseOrders.routes.js';
import salesRouter from './routes/sales.routes.js';
import employeeRouter from './routes/employee.routes.js';
import attendanceRouter from './routes/attendance.routes.js';
import payrollRouter from './routes/payroll.routes.js';
import leaveRouter from './routes/leaves.routes.js';
import salaryRouter from './routes/salary.routes.js';
import welfareFacilityRouter from './routes/welfareFacility.routes.js';
import customerRouter from './routes/customer.routes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 8070;

//middlewear
app.use(cors());
app.use(bodyParser.json());
app.use('/machinery', machineryRouter);
app.use('/maintainence', maintainenceRouter);
app.use('/maintainenceVehicle', maintainenceVehicleRouter);
app.use('/maintainenceMachine', maintainenceMachineRouter);
app.use('/production/order', orderRouter);
app.use('/finance', financeRouter);
app.use('/transport', transportRouter);
app.use('/driver', driverRouter);
app.use('/stock', stockRouter);
app.use('/stockUtilisation', stockUtilisationRouter);
app.use('/pendingStock', pendingStockRouter);
app.use('/supplier', supplierRouter);
app.use('/purchaseOrder', purchaseOrderRouter);
app.use('/sales', salesRouter);
app.use('/employee', employeeRouter);
app.use('/attendance', attendanceRouter);
app.use('/payroll', payrollRouter);
app.use('/leave', leaveRouter);
app.use('/salary', salaryRouter);
app.use('/welfareFacility', welfareFacilityRouter);
app.use('/customer', customerRouter);
app.use('/users', userRoutes);

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
