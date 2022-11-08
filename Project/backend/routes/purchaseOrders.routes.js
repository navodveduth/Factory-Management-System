import express from "express";

//importing controllers
import {
    getAllPurchaseOrders, 
    getOnePurchaseOrders, 
    getDateRangePurchaseOrder,
    addPurchaseOrders, 
    deletePurchaseOrders, 
    updatePurchaseOrders
} from "../controllers/Supplier/purchaseOrders.controller.js"

const router = express.Router();

//assinging the routes to the controllers
router.get("/", getAllPurchaseOrders);
router.get("/:id", getOnePurchaseOrders);
router.get("/date/:DS/:DE", getDateRangePurchaseOrder);
router.post("/create", addPurchaseOrders);
router.delete("/delete/:id", deletePurchaseOrders);
router.put("/update/:id", updatePurchaseOrders);

export default router;




