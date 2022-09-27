import express from "express";
import { getAllSalesDetails, getOneOrderDetail, createOrder, updateOrderDetails, deleteOrderDetails} from "../controllers/sales.controller.js";

const router = express.Router();

//http://localhost:8070/
router.get("/", getAllSalesDetails);
router.get("/:id", getOneOrderDetail);
router.post("/create", createOrder);
router.put("/update/:id",updateOrderDetails);
router.delete("/delete/:id", deleteOrderDetails);

export default router;