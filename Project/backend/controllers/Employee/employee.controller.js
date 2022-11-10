import Employee from "../../models/Employee/employee.model.js";
import mongoose from "mongoose";

// Create and Save a new Employee
export const createEmployee = async (req, res) => {
    // Validate request
    try {
        const employee = req.body;
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        res.status(200).json(newEmployee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all employees from the database.
export const getAllEmployeeDetails = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single employee with a employeeId
export const getOneEmployeeDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.findById(id);
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a employee identified by the employeeId in the request
export const updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = req.body;
        const updatedEmployee = await Employee.findByIdAndUpdate(id, employee, { new: true });
        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a employee with the specified employeeId in the request
export const deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        await Employee.findByIdAndDelete(id);
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single employee with a employeeId
export const getOneEmployeeDetailsByEmployeeNumber = async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const employee = await Employee.findOne({ employeeNumber: employeeNumber });
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a employee details and salary details with id with lookup
/*export const getOneEmployeeDetailsWithSalaryDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup:{
                    from: "salaries",
                    localField: "employeeNumber" ,
                    foreignField: "employeeNumber",
                    as: "salaryDetails"
                }
            }
        ]);
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}*/

// Find employee details with id and combine it with salary details and leaves details with lookup
export const getOneEmployeeDetailsWithSalaryDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(id) }
            },
            {
                $lookup:{
                    from: "salaries",
                    localField: "employeeNumber" ,
                    foreignField: "employeeNumber",
                    as: "salaryDetails"
                }
            },
            {   
                $unwind:"$salaryDetails" 
            },
            {
                $lookup:{
                    from: "leaves",
                    localField: "employeeNumber" ,
                    foreignField: "employeeNumber",
                    as: "leavesDetails"
                }
            }
        ]);
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// get an array containing only the employee numbers from the employee collection
export const getEmployeeNumbers = async (req, res) => {
    try {
        const employeeNumbers = await Employee.aggregate([
            {
                $project: { employeeNumber: 1 }
            }
        ]);
        res.status(200).json(employeeNumbers);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
