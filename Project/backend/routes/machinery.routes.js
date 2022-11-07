import express from "express";
import { getAllMachineryDetails, getDateRangeMachinery,getOneMachineryDetail,createMachineryDetails, updateMachineryDetails, deleteMachineryDetails} from "../controllers/MachineryAndMaintenance/machinery.controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllMachineryDetails);
router.get("/date/:DS/:DE", getDateRangeMachinery);
router.get("/:id", getOneMachineryDetail);
router.post("/create", createMachineryDetails);
router.put("/update/:id",updateMachineryDetails);
router.delete("/delete/:id",deleteMachineryDetails);

export default router;