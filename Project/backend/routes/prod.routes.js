import { getAllOrders,createOrder } from "../controllers/Production/Prod.OrderCost.Controller.js";
import express, { application } from "express";

const router = express.Router();

router.post("/orderCreate",createOrder);
router.get("/allOrders",getAllOrders);



export default router;