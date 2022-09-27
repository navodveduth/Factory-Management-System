//cluster is a data storage -> has schema (like collections) defines ->> has documents

//importing dependencies
import mongoose from "mongoose";

//instantiating a schema
const Schema = mongoose.Schema;

//defining the structure of the schema
const stockSchema = new Schema({
    //backend validations are done here  
    stockCode: {
        type: String,
        unique:true,
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
        enum: ['Raw materials', 'Work in progress', 'Finished goods'],
    },
    lastUpdated: {
        type: Date, 
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    reorderLevel: { //needs to be updated later and not when adding
        type: Number,
        min: 0,
        default:0,
    },
    unitPrice: {
        type: Number,
        min: 0,
        default: 0.0,
    },
    supplier: {
        type: String,
        required: true,
    },
    totalValue: {
        type: Number,
        min: 0,
        default: 0.0,
    },
    sufficientStock: {
        type: String,
        default: "-",
    }
})

//Stock is inside the schema -> Stock is part of the collections
const Stock = mongoose.model("stock", stockSchema);  //stockschema is the object of stock schema and stock is stockSchema

export default Stock;