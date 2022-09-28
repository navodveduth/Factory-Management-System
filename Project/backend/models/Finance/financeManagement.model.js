import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fmSchema = new Schema({
    trnID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        mixlength: 3,
        maxlength:4, 
    },
    trnDesc: {
        type: String,
        required: true,
        maxlength:200,
    },
    trnAmount: {
        type: Number,
        required: true,
    },
    trnType: {
        type: String,
        required: true,
        maxlength: 10,
    },
    trnRecordedDate: {
        type: Date,
        required: true
    },

})

const financeData = mongoose.model("finance", fmSchema)
export default financeData;