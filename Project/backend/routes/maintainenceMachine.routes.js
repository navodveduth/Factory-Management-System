import express from "express";
import { getAllMMaintainenceDetails, getOneMMaintainenceDetail,createMMaintainenceDetails, updateMMaintainenceDetails, deleteMMaintainenceDetails} from "../controllers/MachineryAndMaintenance/maintainenceMachine.controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllMMaintainenceDetails);
router.get("/:id", getOneMMaintainenceDetail);
router.post("/create", createMMaintainenceDetails);
router.put("/update/:id",updateMMaintainenceDetails);
router.delete("/delete/:id",deleteMMaintainenceDetails);

export default router;