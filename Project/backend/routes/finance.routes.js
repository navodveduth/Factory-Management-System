import { addFinancialData, viewAllFinancialData, viewOneFinancialData, updateFinancialData, deleteFinancialData, getDateRangeFinance } from "../controllers/Finance/financeManagement.controller.js";
import express from "express";

const router = express.Router();

router.post("/createTransaction", addFinancialData);
router.get("/viewTransaction", viewAllFinancialData);
router.get("/date/:DS/:DE", getDateRangeFinance);
router.get("/viewTransaction/:id", viewOneFinancialData);
router.put("/updateTransaction/:id", updateFinancialData);
router.delete("/deleteTransaction/:id", deleteFinancialData);


export default router;