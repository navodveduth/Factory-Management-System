
//cluster is a data storage -> has schema (like collections) defines ->> has documents

//importing dependencies
import mongoose from "mongoose";
//instantiating a schema
const Schema = mongoose.Schema;

//defining the structure of the schema
const stockUtilSchema = new Schema({
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
    date: {
        type: Date,
    },
    firstPurchaseDate: {
        type: Date,
    },
    type: {
        type: String,
        required: true,
        enum: ['Additions', 'Issues'],
    },
    // supplier: {
    //     type: String,
    //     default: "-",
    // },
    unitPrice: {
        type: Number,
        required: true,
        min: 0.0,
        default: 0.0,
    },
    quantity: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalValue:{
        type: Number,
        required: true,
        min: 0.0,
        default: 0.0,
    }
})

//DamagedStock is inside the schema -> DamagedStock is part of the collections
const StockUtilisation = mongoose.model("stockUtilisation", stockUtilSchema); //stockschema is the object of stock schema and stock is stockSchema


export default StockUtilisation;