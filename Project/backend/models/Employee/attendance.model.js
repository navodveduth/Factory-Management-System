import mongoose from "mongoose"; // Import mongoose //

const Schema = mongoose.Schema;
const attendanceSchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    attendaceDate: {
        type: Date,
        required: true,
    },
    employeeInTime: {
        type: Date,
        required: true,
    },
    employeeOutTime: {
        type: Date,
 
    },
    employeeTotalHours: {
        type: Number,
 
        maxlength: 2,
    },
    employeeOTHours: {
        type: Number,

        maxlength: 2,
    },
    attendaceStatus: { //OT, normal, leave
        type: String,
        required: true,
        maxlength: 20,
    },
});

const Attendance = mongoose.model("attendance", attendanceSchema);
export default Attendance;