import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fmSchema = new Schema({
    revenue: {
        type: Number,
        required: true
    },
    expenses: {
        type: Number,
        required: true
    },
    recordedDate: {
        type: Date,
        default: Date.now,
        required: true
    }
})

const financeData = mongoose.model("FinanceData", fmSchema)
export default financeData;