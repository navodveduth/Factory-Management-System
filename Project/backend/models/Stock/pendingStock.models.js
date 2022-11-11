//cluster is a data storage -> has schema (like collections) defines ->> has documents

//importing dependencies
import mongoose from "mongoose";

//instantiating a schema
const Schema = mongoose.Schema;

//defining the structure of the schema
const stockPendingSchema = new Schema({
    //backend validations are done here  
    stockCode: {
        type: String,
        min:5,
        max:8,
        required:true,
    },
    stockName: {
        type: String,
        required: true,
    },
    stockCategory: {
        type: String,
        required: true,
        enum: ['Raw materials', 'Work in progress'],
    },
    description :{
        type: String,
        required:true
     },
     date:{
        type: Date,
        required: true,
     },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending','Processing','Resolved']
    }
})

//Stock is inside the schema -> Stock is part of the collections
const StockPending = mongoose.model("stockPending", stockPendingSchema);  //stockschema is the object of stock schema and stock is stockSchema

export default StockPending;