import mongoose from "mongoose"; // Import mongoose

const Schema = mongoose.Schema;
const leavesSchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    leaveStartDate: {
        type: Date,
        required: true,
    },
    leaveEndDate: {
        type: Date,
        required: true,
    },
    leaveType: {
        type: String,
        required: true,
        maxlength: 20,
    },
    leaveReason: {
        type: String,
        required: true,
        maxlength: 100,
    },
    leaveStatus: {
        type: String,
        required: true,
        maxlength: 20,
    },
});

const Leave = mongoose.model("leave", leavesSchema);
export default Leave;