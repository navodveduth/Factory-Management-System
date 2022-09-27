import { 
    getAllSuppliers, 
    getOneSupplierDetails, 
    createSupplierDetails, 
    updateSupplierDetails, 
    deleteSupplierDetails 
} from "../controllers/Supplier/supplier.controller.js";

import express from "express";


const router = express.Router();//

router.get("/", getAllSuppliers);
router.get("/:id", getOneSupplierDetails);
router.post("/create", createSupplierDetails);
router.put("/update/:id", updateSupplierDetails);
router.delete("/delete/:id", deleteSupplierDetails);

export default router;
    