//importing dependency
import express from "express";

//importing controllers
import {getAllPendingStocks, getOnePendingStock, addPendingStock, deletePendingStock, updatePendingStock} from "../controllers/Stock/pendingStock.controllers.js"

const router = express.Router();

//works similar to https://localhost/8070/
//assinging the routes to the controllers
router.get("/", getAllPendingStocks);
router.get("/:id", getOnePendingStock)
router.post("/create", addPendingStock);
router.delete("/delete/:id", deletePendingStock);
router.put("/update/:id", updatePendingStock);

export default router;