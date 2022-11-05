//importing dependency
import express from "express";

//importing controllers
import {getAllDamagedStockDetails, getOneDamagedStockDetails, addDamagedStock, deleteDamagedStock, updateDamagedStock} from "../controllers/Stock/damagedStock.controllers.js"

const router = express.Router();

//works similar to https://localhost/8070/
//assinging the routes to the controllers
router.get("/", getAllDamagedStockDetails);
router.get("/:id", getOneDamagedStockDetails)
router.post("/create", addDamagedStock);
router.delete("/delete/:id", deleteDamagedStock);
router.put("/update/:id", updateDamagedStock);

export default router;