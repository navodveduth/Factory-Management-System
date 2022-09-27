import express from "express";
import {createEmployee, getAllEmployeeDetails, getOneEmployeeDetails, updateEmployee, deleteEmployee, getOneEmployeeDetailsByEmployeeNumber} from "../controllers/Employee/employee.controller.js";

const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/viewEmployee", getAllEmployeeDetails);
router.get("/viewEmployee/:id", getOneEmployeeDetails);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.get("/viewEmployeeNum/:employeeNumber", getOneEmployeeDetailsByEmployeeNumber);

export default router;
