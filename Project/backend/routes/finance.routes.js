import { addFinancialData, viewAllFinancialData, viewOneFinancialData, updateFinancialData, deleteFinancialData, viewFDByRevenue } from "../controllers/Finance/financeManagement.controller.js";
import express from "express";

const router = express.Router();

router.post("/createTransaction", addFinancialData);
router.get("/viewTransaction", viewAllFinancialData);
router.get("/viewTransaction/:id", viewOneFinancialData);
router.get("/date/:revenue", viewFDByRevenue);
router.put("/updateTransaction/:id", updateFinancialData);
router.delete("/deleteTransaction/:id", deleteFinancialData);


export default router;