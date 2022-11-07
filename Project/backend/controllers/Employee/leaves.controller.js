import Leave from "../../models/Employee/leaves.model.js";

// Create and Save a new Leave
export const createLeave = async (req, res) => {
    // Validate request
    try {
        const leave = req.body;
        const newLeave = new Leave(leave);
        await newLeave.save();
        res.status(200).json(newLeave);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all leaves from the database.
export const getAllLeaveDetails = async (req, res) => {
    try {
        const leaves = await Leave.aggregate([
            {
                $lookup:{
                    from: "employees",
                    localField: "employeeNumber" ,
                    foreignField: "employeeNumber",
                    as: "employeeDetails"
                }
            }
        ]);
        res.status(200).json(leaves);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single leave with a leaveId
export const getOneLeaveDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const leave = await Leave.findById(id);
        res.status(200).json(leave);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a leave identified by the leaveId in the request
export const updateLeave = async (req, res) => {
    try {
        const id = req.params.id;
        const leave = req.body;
        const updatedLeave = await Leave.findByIdAndUpdate(id, leave, { new: true });
        res.status(200).json(updatedLeave);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a leave with the specified leaveId in the request
export const deleteLeave = async (req, res) => {
    try {
        const id = req.params.id;
        await Leave.findByIdAndDelete(id);
        res.status(200).json({ message: "Leave deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single leave with a leaveId
export const getOneLeaveDetailsByEmployeeNumber =  async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const leave = await Leave.find({employeeNumber: employeeNumber});
        res.status(200).json(leave);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a all leaves with a employeeNumber
export const getAllLeaveDetailsByEmployeeNumber =  async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const leaves = await Leave.find({employeeNumber: employeeNumber});
        res.status(200).json(leaves);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}