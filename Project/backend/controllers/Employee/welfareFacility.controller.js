import WelfareFacility from "../../models/Employee/welfareFacility.model.js";

// Create and Save a new WelfareFacility
export const createWelfareFacility = async (req, res) => {
    // Validate request
    try {
        const welfareFacility = req.body;
        const newWelfareFacility = new WelfareFacility(welfareFacility);
        await newWelfareFacility.save();
        res.status(200).json(newWelfareFacility);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all welfareFacilities from the database.
export const getAllWelfareFacilityDetails = async (req, res) => {
    try {
        const welfareFacilities = await WelfareFacility.find();
        res.status(200).json(welfareFacilities);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single welfareFacility with a welfareFacilityId
export const getOneWelfareFacilityDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const welfareFacility = await WelfareFacility.findById(id);
        res.status(200).json(welfareFacility);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a welfareFacility identified by the welfareFacilityId in the request
export const updateWelfareFacility = async (req, res) => {
    try {
        const id = req.params.id;
        const welfareFacility = req.body;
        const updatedWelfareFacility = await WelfareFacility.findByIdAndUpdate(id, welfareFacility, { new: true });
        res.status(200).json(updatedWelfareFacility);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a welfareFacility with the specified welfareFacilityId in the request
export const deleteWelfareFacility = async (req, res) => {
    try {
        const id = req.params.id;
        await WelfareFacility.findByIdAndDelete(id);
        res.status(200).json({ message: "WelfareFacility deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}