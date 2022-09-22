import { getAllOrders,createOrder } from "../controllers/Production/prod.orderCost.controller.js";
import express from "express";
const router = express.Router();

router.post("/orderCreate",createOrder);
router.get("/allOrders",getAllOrders);



export default router;