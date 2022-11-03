//importing dependency
import express from "express";

//importing controllers
import {getAllStockUtilDetails, getOneStockUtilDetails, addStockUtil, deleteStockUtil,  updateStockUtil} from "../controllers/Stock/stockUtilisation.controllers.js"

const router = express.Router();

//works similar to https://localhost/8070/
//assinging the routes to the controllers
router.get("/", getAllStockUtilDetails);
router.get("/:id", getOneStockUtilDetails)
router.post("/create", addStockUtil);
router.delete("/delete/:id", deleteStockUtil);
router.put("/update/:id", updateStockUtil);

export default router;