import mongoose from "mongoose";

const Schema = mongoose.Schema;

const salesSchema = new Schema({

    invoiceNo : {
        type: String,
        required: true,
        unique: true
    },

    orderDate : {
        type: Date,
        required: true,
    },

    customerID : {
        type: String,
        required: true
    },

    itemName : {
        type: String,
        required: true,
    },

    quantity : {
        type: Number,
        required: true,
    },

    totalAmount : {
        type: Number,
        
    },

    status : {
        type: String, 
    }


});

const Sales = mongoose.model("sales", salesSchema);

export default Sales;
