import { getAllOrders,createOrder, getOneOrder, updateOrderDetails, deleteOrder } from "../controllers/Production/prod.orderCost.controller.js";
import express from "express";
const router = express.Router();

//router.post("/orderCreate",createOrder);


router.get("/allOrders",getAllOrders);
router.post("/orderCreate",createOrder);
router.get("/:id",getOneOrder);
router.put("/update/:id",updateOrderDetails);
router.delete("/delete/:id",deleteOrder);


export default router;
