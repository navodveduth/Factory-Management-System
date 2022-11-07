import express from "express";
import { getAllVMaintainenceDetails,getDateRangeVehiMaint, getOneVMaintainenceDetail,createVMaintainenceDetails, updateVMaintainenceDetails, deleteVMaintainenceDetails} from "../controllers/MachineryAndMaintenance/maintainenceVehicle.Controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllVMaintainenceDetails);
router.get("/date/:DS/:DE", getDateRangeVehiMaint);
router.get("/:id", getOneVMaintainenceDetail);
router.post("/create", createVMaintainenceDetails);
router.put("/update/:id",updateVMaintainenceDetails);
router.delete("/delete/:id",deleteVMaintainenceDetails);

export default router;