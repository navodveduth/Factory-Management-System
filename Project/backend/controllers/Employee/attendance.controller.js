import Attendace from '../../models/Employee/attendance.model.js';

// Create and Save a new Attendace
export const createAttendance = async (req, res) => {
    // Validate request
    try {
        const attendace = req.body;
        const newAttendace = new Attendace(attendace);
        await newAttendace.save();
        res.status(200).json(newAttendace);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all attendaces from the database.
export const getAllAttendanceDetails = async (req, res) => {
    try {
        const attendaces = await Attendace.find();
        res.status(200).json(attendaces);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single attendace with a attendaceId
export const getOneAttendanceDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const attendace = await Attendace.findById(id);
        res.status(200).json(attendace);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a attendace identified by the attendaceId in the request
export const updateAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        const attendace = req.body;
        const updatedAttendace = await Attendace.findByIdAndUpdate(id, attendace, { new: true });
        res.status(200).json(updatedAttendace);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a attendace with the specified attendaceId in the request
export const deleteAttendance = async (req, res) => {
    try {
        const id = req.params.id;
        await Attendace.findByIdAndDelete(id);
        res.status(200).json({ message: "Attendace deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single attendace with a employeeID
export const getAttendanceByEmployeeNumber = async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const attendace = await Attendace.find({ employeeNumber: employeeNumber });
        res.status(200).json(attendace);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}