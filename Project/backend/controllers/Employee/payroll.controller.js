import Payroll from "../../models/Employee/payroll.model.js";


// Create and Save a new Payroll
export const createPayroll = async (req, res) => {
    // Validate request
    try {
        const payroll = req.body;
        const newPayroll = new Payroll(payroll);
        await newPayroll.save();
        res.status(200).json(newPayroll);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all payrolls from the database.
export const getAllPayrollDetails = async (req, res) => {
    try {
        const payrolls = await Payroll.find();
        res.status(200).json(payrolls);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single payroll with a payrollId
export const getOnePayrollDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const payroll = await Payroll.findById(id);
        res.status(200).json(payroll);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a payroll identified by the payrollId in the request
export const updatePayroll = async (req, res) => {
    try {
        const id = req.params.id;
        const payroll = req.body;
        const updatedPayroll = await Payroll.findByIdAndUpdate(id, payroll, { new: true });
        res.status(200).json(updatedPayroll);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a payroll with the specified payrollId in the request
export const deletePayroll = async (req, res) => {
    try {
        const id = req.params.id;
        await Payroll.findByIdAndDelete(id);
        res.status(200).json({ message: "Payroll deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single payroll with employeeNumber
export const getOnePayrollDetailsByEmployeeNumber =  async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const payroll = await Payroll.find({employeeNumber: employeeNumber});
        res.status(200).json(payroll);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}