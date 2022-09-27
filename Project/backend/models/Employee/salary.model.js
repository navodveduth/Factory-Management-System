import mongoose from "mongoose"; //

const Schema = mongoose.Schema;
const salarySchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    
    employeeBasicSalary: {
        type: Number,
        required: true,
        maxlength: 10,
    },
    
    employeeAllowance: {
        type: Number,
        required: true,
        maxlength: 10,
    },

    employeeIncentive: {
        type: Number,
        required: true,
        maxlength: 10,
    },
});

const Salary = mongoose.model("salary", salarySchema);

export default Salary;