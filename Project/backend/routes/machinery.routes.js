import express from "express";
import { getAllMachineryDetails, getOneMachineryDetail,createMachineryDetails, updateMachineryDetails, deleteMachineryDetails} from "../controllers/machinery.controller.js";

const router = express.Router();

//http://localhost:80700/
router.get("/", getAllMachineryDetails);
router.get("/:id", getOneMachineryDetail);
router.post("/create", createMachineryDetails);
router.put("/update/:id",updateMachineryDetails);
router.delete("/delete/:id",deleteMachineryDetails);

export default router;