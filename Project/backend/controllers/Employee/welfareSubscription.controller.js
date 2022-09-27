import WelfareSubscription from "../../models/Employee/welfareSubscription.model.js";

// Create and Save a new WelfareSubscription
export const createWelfareSubscription = async (req, res) => {
    // Validate request
    try {
        const welfareSubscription = req.body;
        const newWelfareSubscription = new WelfareSubscription(welfareSubscription);
        await newWelfareSubscription.save();
        res.status(200).json(newWelfareSubscription);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all welfareSubscriptions from the database.
export const getAllWelfareSubscriptionDetails = async (req, res) => {
    try {
        const welfareSubscriptions = await WelfareSubscription.find();
        res.status(200).json(welfareSubscriptions);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single welfareSubscription with a welfareSubscriptionId
export const getOneWelfareSubscriptionDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const welfareSubscription = await WelfareSubscription.findById(id);
        res.status(200).json(welfareSubscription);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a welfareSubscription identified by the welfareSubscriptionId in the request
export const updateWelfareSubscription = async (req, res) => {
    try {
        const id = req.params.id;
        const welfareSubscription = req.body;
        const updatedWelfareSubscription = await WelfareSubscription.findByIdAndUpdate(id, welfareSubscription, { new: true });
        res.status(200).json(updatedWelfareSubscription);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a welfareSubscription with the specified welfareSubscriptionId in the request
export const deleteWelfareSubscription = async (req, res) => {
    try {
        const id = req.params.id;
        await WelfareSubscription.findByIdAndDelete(id);
        res.status(200).json({ message: "WelfareSubscription deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single welfareSubscription with employeeNumber
export const getOneWelfareSubscriptionDetailsByEmployeeNumber =  async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const welfareSubscription = await WelfareSubscription.find({employeeNumber: employeeNumber});
        res.status(200).json(welfareSubscription);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}