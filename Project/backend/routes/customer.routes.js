import express from "express";
import { getAllCustomers, getOneCustomer, createCustomer, updateCustomer, deleteCustomer} from "../controllers/Sales/customer.controller.js";

const router = express.Router();

//http://localhost:8070/
router.get("/all", getAllCustomers);
router.get("/view/:id", getOneCustomer);
router.post("/create", createCustomer);
router.put("/update/:id",updateCustomer);
router.delete("/delete/:id", deleteCustomer);

export default router;