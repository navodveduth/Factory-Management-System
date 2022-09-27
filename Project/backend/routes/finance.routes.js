import { addFinancialData, viewAllFinancialData, viewOneFinancialData, updateFinancialData, deleteFinancialData, viewFDByRevenue } from "../controllers/Finance/financeManagement.controller.js";
import express from "express";

const router = express.Router();

router.post("/add", addFinancialData);
router.get("/", viewAllFinancialData);
router.get("/:id", viewOneFinancialData);
router.get("/date/:revenue", viewFDByRevenue);
router.put("/update/:id", updateFinancialData);
router.delete("/delete/:id", deleteFinancialData);


export default router;