//importing dependency
import express from "express";

//importing controllers
import {getAllStockDetails , getOneStockDetails , addStock  ,deleteStock ,getDateRangeStock, getOneStockCategory, updateStock} from "../controllers/Stock/stock.controllers.js"

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

export default router;