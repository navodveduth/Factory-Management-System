import Salary from "../../models/Employee/salary.model.js";

// Create and Save a new Salary
export const createSalary = async (req, res) => {
    // Validate request
    try {
        const salary = req.body;
        const newSalary = new Salary(salary);
        await newSalary.save();
        res.status(200).json(newSalary);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Retrieve and return all salaries from the database.
export const getAllSalaryDetails = async (req, res) => {
    try {
        const salaries = await Salary.aggregate([
            {
                $lookup:
                {
                    from: "employees",
                    localField: "employeeNumber", 
                    foreignField: "employeeNumber", 
                    as: "employeeInfo" 
                }
            },
            {
                $unwind: "$employeeInfo"
            }
        ]);
        res.status(200).json(salaries);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single salary with a salaryId
export const getOneSalaryDetails =  async (req, res) => {
    try {
        const id = req.params.id;
        const salary = await Salary.findById(id);
        res.status(200).json(salary);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Update a salary identified by the salaryId in the request
export const updateSalary = async (req, res) => {
    try {
        const id = req.params.id;
        const salary = req.body;
        const updatedSalary = await Salary.findByIdAndUpdate(id, salary, { new: true });
        res.status(200).json(updatedSalary);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Delete a salary with the specified salaryId in the request
export const deleteSalary = async (req, res) => {
    try {
        const id = req.params.id;
        await Salary.findByIdAndDelete(id);
        res.status(200).json({ message: "Salary deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: error });
    }
}

// Find a single salary with a employeeNumber
export const getOneSalaryDetailsByEmployeeNumber =  async (req, res) => {
    try {
        const employeeNumber = req.params.employeeNumber;
        const salary = await Salary.findOne({ employeeNumber: employeeNumber });
        res.status(200).json(salary);
    } catch (error) {
        res.status(404).json({ message: error });
    }
}



