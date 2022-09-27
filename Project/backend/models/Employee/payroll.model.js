import mongoose from "mongoose"; //

const Schema = mongoose.Schema;
const payrollSchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },

    payrollDate: {
        type: Date,
        required: true,
    },
    
    totalSalary: {
        type: Number,
        required: true,
        maxlength: 15,
    },
});

const Payroll = mongoose.model("payroll", payrollSchema);

export default Payroll;