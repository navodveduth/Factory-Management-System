import express from "express";
import {createPayroll, getAllPayrollDetails, getOnePayrollDetails, updatePayroll, deletePayroll,getOnePayrollDetailsByEmployeeNumber} from "../controllers/Employee/payroll.controller.js";

const router = express.Router();

router.post("/createPayroll", createPayroll);
router.get("/viewPayroll", getAllPayrollDetails);
router.get("/viewPayroll/:id", getOnePayrollDetails);
router.put("/updatePayroll/:id", updatePayroll);
router.delete("/deletePayroll/:id", deletePayroll);
router.get("/viewPayrollNum/:employeeNumber", getOnePayrollDetailsByEmployeeNumber);


export default router;