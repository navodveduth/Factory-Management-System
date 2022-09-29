import mongoose from "mongoose";

const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    employeeFullName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    employeeNameWithInitials: {
        type: String,
        required: true,
        maxlength: 100,
    },
    employeeNIC: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 12,
        pattern: "^[0-9]{9}[vVxX]$ | ^[0-9]{12}$",
    },
    employeeGender: {
        type: String,
        required: true,
        maxlength: 10,
    },
    employeeDOB: {
        type: Date,
        required: true,
    },
    employeeDateOfJoin: {
        type: Date,
        required: true,
    },
    employeeDesignation: {
        type: String,
        required: true,
        maxlength: 100,
    },
    employeeDepartment: {
        type: String,
        required: true,
        maxlength: 100,
    },
    employeeType: {
        type: String,
        required: true,
        maxlength: 20,
    },
    employeeAddress: {
        type: String,
        required: true,
        maxlength: 150,
    },
    employeeContactNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        pattern: "^[0-9]{10}$",
    },
    employeeEmail: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100,
        pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    }
    
});

const Employee = mongoose.model("employee", employeeSchema); 
export default Employee;
