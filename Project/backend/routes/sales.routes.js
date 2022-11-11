import express from "express";
import { getAllSalesDetails, getOneOrderDetail, createOrder, updateOrderDetails, deleteOrderDetails, printOneInvoice, getSalesByDateRange} from "../controllers/Sales/sales.controller.js";

const router = express.Router();

//http://localhost:8070/
router.get("/", getAllSalesDetails);
router.get("/date/:DS/:DE", getSalesByDateRange);
router.get("/:id", getOneOrderDetail);
router.get("/print/:id", printOneInvoice);
router.post("/create", createOrder);
router.put("/update/:id",updateOrderDetails);
router.delete("/delete/:id", deleteOrderDetails);


export default router;