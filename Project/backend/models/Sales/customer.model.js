import mongoose from "mongoose";

const Schema = mongoose.Schema;

const customerSchema = new Schema({

    customerID : {
        type: String,
        required: true,
        unique: true
    },

    customerName : {
        type: String,
        required: true
    },

    customerContactNo : {
        type: String,
        required: true,
        unique: true
    },

    customerAddress : {
        type: String   
    }

});

const Customer = mongoose.model("customers", customerSchema);

export default Customer;