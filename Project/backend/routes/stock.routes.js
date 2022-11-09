//importing dependency
import express from "express";

//importing controllers
import {getAllStockDetails,setProductionStatus,getOneStockByStockName,getOrderFromInvoice,updateStockByStockCode,getOneStockByStockCode ,getOneStockInfo, getOneStockDetails , addStock  ,deleteStock ,getDateRangeStock, getOneStockCategory, updateStock} from "../controllers/Stock/stock.controllers.js"

const router = express.Router();

//works similar to https://localhost/8070/
//assinging the routes to the controllers
router.get("/", getAllStockDetails);
router.get("/:id", getOneStockDetails)
router.post("/create", addStock);
router.delete("/delete/:id", deleteStock);
router.put("/update/:id", updateStock);
router.get("/date/:DS/:DE", getDateRangeStock);
router.get("/category/:categ", getOneStockCategory);
router.get("/stockInfo/:id",getOneStockInfo);
router.get("/ViewStock/:stockID",getOneStockByStockCode);
router.put("/updateByCode/:code",updateStockByStockCode);
router.get("/request/:invoiceNo",getOrderFromInvoice); 
router.get("/ViewStockname/:name",getOneStockByStockName);
router.put("/updateStatus/:invoiceNo",setProductionStatus);


export default router;