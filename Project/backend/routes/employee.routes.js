import express from "express";
import {createEmployee, getAllEmployeeDetails, getOneEmployeeDetails, updateEmployee, deleteEmployee, getOneEmployeeDetailsByEmployeeNumber, getOneEmployeeDetailsWithSalaryDetails, getEmployeeNumbers} from "../controllers/Employee/employee.controller.js";

const router = express.Router();

router.post("/createEmployee", createEmployee);
router.get("/viewEmployee", getAllEmployeeDetails);
router.get("/viewEmployee/:id", getOneEmployeeDetails);
router.put("/updateEmployee/:id", updateEmployee);
router.delete("/deleteEmployee/:id", deleteEmployee);
router.get("/viewEmployeeNum/:employeeNumber", getOneEmployeeDetailsByEmployeeNumber);
router.get("/viewEmployeeAndSalary/:id", getOneEmployeeDetailsWithSalaryDetails);
router.get("/viewEmployeeNumbers", getEmployeeNumbers);

export default router;
