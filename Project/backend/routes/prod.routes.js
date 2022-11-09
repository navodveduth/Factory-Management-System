import { getAllOrders,createOrder, getOneOrder, updateOrderDetails, deleteOrder, showPending, setSaleStatus, getFromInvoice, getOrderFromInvoice,updateCost, getDateRangeProduction} from "../controllers/Production/prod.orderCost.controller.js";
import express from "express";
const router = express.Router();

//router.post("/orderCreate",createOrder);


router.get("/allOrders",getAllOrders);
router.post("/orderCreate",createOrder);
router.get("/:id",getOneOrder);
router.put("/update/:id",updateOrderDetails);
router.put("/finalCost/:invoiceNo",updateCost);
router.delete("/delete/:id",deleteOrder);
router.get("/viewPending",showPending);
router.get("/pending/:invoiceNo",getFromInvoice);
router.put("/updateStatus/:invoiceNo",setSaleStatus);
router.get("/completed/:invoiceNo",getOrderFromInvoice); 
router.get("/date/:DS/:DE",getDateRangeProduction)




export default router;
