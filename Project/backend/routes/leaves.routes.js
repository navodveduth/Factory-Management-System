import express from "express";
import {createLeave, getAllLeaveDetails, getOneLeaveDetails, updateLeave, deleteLeave, getOneLeaveDetailsByEmployeeNumber} from "../controllers/Employee/leaves.controller.js";

const router = express.Router();

router.post("/createLeave", createLeave);
router.get("/viewLeave", getAllLeaveDetails);
router.get("/viewLeave/:id", getOneLeaveDetails);
router.get("/viewLeaveNum/:employeeNumber", getOneLeaveDetailsByEmployeeNumber);
router.put("/updateLeave/:id", updateLeave);
router.delete("/deleteLeave/:id", deleteLeave);

export default router;