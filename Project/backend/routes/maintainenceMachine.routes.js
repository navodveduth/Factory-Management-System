import express from "express";
import { getAllMMaintainenceDetails,getDateRangeMachMaint, getAllMMaintainenceDetailByMachineryNumber, getOneMMaintainenceDetailByMachineryNumber, getOneMMaintainenceDetail,createMMaintainenceDetails, updateMMaintainenceDetails, deleteMMaintainenceDetails} from "../controllers/MachineryAndMaintenance/maintainenceMachine.controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllMMaintainenceDetails);
router.get("/:id", getOneMMaintainenceDetail);
router.get("/date/:DS/:DE", getDateRangeMachMaint);
router.post("/create", createMMaintainenceDetails);
router.put("/update/:id",updateMMaintainenceDetails);
router.delete("/delete/:id",deleteMMaintainenceDetails);
router.get("/viewMaintainenceMachineNum/:machineID", getOneMMaintainenceDetailByMachineryNumber);
router.get("/viewMaintainenceMachinesNum/:machineID", getAllMMaintainenceDetailByMachineryNumber);

export default router;