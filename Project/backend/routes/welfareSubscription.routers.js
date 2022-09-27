import express from "express";
import {createWelfareSubscription, getAllWelfareSubscriptionDetails, getOneWelfareSubscriptionDetails, updateWelfareSubscription, deleteWelfareSubscription, getOneWelfareSubscriptionDetailsByEmployeeNumber} from "../controllers/Employee/welfareSubscription.controller.js";

const router = express.Router();

router.post("/createWelfareSubscription", createWelfareSubscription);
router.get("/viewWelfareSubscription", getAllWelfareSubscriptionDetails);
router.get("/viewWelfareSubscription/:id", getOneWelfareSubscriptionDetails);
router.put("/updateWelfareSubscription/:id", updateWelfareSubscription);
router.delete("/deleteWelfareSubscription/:id", deleteWelfareSubscription);
router.get("/viewWelfareSubscriptionNum/:employeeNumber", getOneWelfareSubscriptionDetailsByEmployeeNumber);

export default router;
