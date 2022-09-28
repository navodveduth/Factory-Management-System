import express from "express";
import {createSalary, getAllSalaryDetails, getOneSalaryDetails, updateSalary, deleteSalary} from "../controllers/Employee/salary.controller.js";

const router = express.Router();

router.post("/SalaryNew", createSalary);
router.get("/SalaryView", getAllSalaryDetails);
router.get("/SalaryView/:id", getOneSalaryDetails);
router.put("/updateSalary/:id", updateSalary);
router.delete("/deleteSalary/:id", deleteSalary);

export default router;