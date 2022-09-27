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

    customerName : {
        type: String,
        required: true,
    },

    customerContactNo : {
        type: String,
        required: true,
    },

    materialsSupplied : {
        type: String,
        
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
