import purchaseOrder from '../../models/Supplier/PurchaseOrders.model.js';

//includes all CRUD operations

//get all purchaseOrders
export const getAllPurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await purchaseOrder.find();
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//get one purchaseOrder
export const getOnePurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await purchaseOrder.findById(req.params.id);
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//date sort code
export const getDateRangePurchaseOrder = async (req, res) => {
    try {
        const DS = req.params.DS;
        const DE = req.params.DE;
        const purchaseOrderdata = await purchaseOrder.aggregate([
            {
                $match: { deliveryDate: { $gte: new Date(DS), $lte: new Date(DE) } }
            }
        ]);
        res.status(200).json(purchaseOrderdata);
    } catch (error) {
        res.status(404).json({message : error});
    }
}

//add purchaseOrder
export const addPurchaseOrders = async (req, res) => {
    const purchaseOrders = req.body;
    const newPurchaseOrders = new purchaseOrder(purchaseOrders);
    try {
        await newPurchaseOrders.save();
        res.status(201).json(newPurchaseOrders);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//delete purchaseOrder
export const deletePurchaseOrders = async (req, res) => {
    try {
        await purchaseOrder.findByIdAndRemove(req.params.id);
        res.json({ message: "purchaseOrder deleted successfully." });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//update purchaseOrder
export const updatePurchaseOrders = async (req, res) => {
    try {
        const purchaseOrders = await purchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(purchaseOrders);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//date sort code 




