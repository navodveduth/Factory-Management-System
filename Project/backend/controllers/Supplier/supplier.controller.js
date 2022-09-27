import Supplier from "../../models/Supplier/SupplierDetails.model.js";

export const getAllSuppliers = async (req, res) => {
    try {
        const supplier = await Supplier.find();
        res.status(200).json(supplier);

    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });
    }
}

export const getOneSupplierDetails = async (req, res) => {
    try{
        const id = req.params.id;
        const supplier = await Supplier.findById(id);
        res.status(200).json(supplier);
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });
    }

}

export const createSupplierDetails = async (req, res) => {
    try {
        const supplier = req.body;
        const newSupplier = new Supplier(supplier);
        await newSupplier.save();
        res.status(200).json(newSupplier);
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });
    }
}

export const updateSupplierDetails = async (req, res) => {
    try{
        const id = req.params.id;
        const supplier = req.body;
        await Supplier.findByIdAndUpdate(id, supplier);
        res.status(200).json({
            message: "Supplier details updated successfully"
        });
    } catch (error) {
        res.status(404).json({ 
            message: error.message 
        });
    }
}

export const deleteSupplierDetails = async (req, res) => {
    try{
        const id = req.params.id;
        await Supplier.findByIdAndDelete(id);
        res.status(200).json({
            message: "Supplier details deleted successfully"
        });
    } catch (error) {
        res.status(409).json({ 
            message: error.message 
        });
    }
}





