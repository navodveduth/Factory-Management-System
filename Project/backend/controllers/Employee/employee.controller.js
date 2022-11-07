import Employee from "../../models/Employee/employee.model.js";

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
export const getOneEmployeeDetailsWithSalaryDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employee.aggregate([
            {
                $match: { _id: ObjectId(id) }
            }
        ]);
        res.status(200).json(employee);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
