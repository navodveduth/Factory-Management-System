import express from "express";
import { getAllMaintainenceDetails, getDateRangePropertyMaint,getOneMaintainenceDetail,createMaintainenceDetails, updateMaintainenceDetails, deleteMaintainenceDetails} from "../controllers/MachineryAndMaintenance/maintainence.controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllMaintainenceDetails);
router.get("/date/:DS/:DE", getDateRangePropertyMaint);
router.get("/:id", getOneMaintainenceDetail);
router.post("/create", createMaintainenceDetails);
router.put("/update/:id",updateMaintainenceDetails);
router.delete("/delete/:id",deleteMaintainenceDetails);

export default router;