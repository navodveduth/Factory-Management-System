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
        unique:true,
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
     firstPurchaseDate: {
        type: Date,
    },
    // quantity: {
    //     type: Number,
    //     min: 0,
    //     required: true,
    // },
    reorderLevel: { //needs to be updated later and not when adding
        type: Number,
        min: 0,
        default:0,
    },
    // unitPrice:{
    //     type: Number,
    //     min: 0,
    //     default:0,
    // },
    sufficientStock: {
        type: String,
        default: "-",
    },
    // additions:{
    //     type: Number,
    //     min: 0,
    //     default:0.0
    // },
    // issues:{
    //     type: Number,
    //     min: 0,
    //     default:0.0
    // },
    damagedQty:{
        type: Number,
        min: 0.0,
        default:0.0
    }   
})

//Stock is inside the schema -> Stock is part of the collections
const Stock = mongoose.model("stock", stockSchema);  //stockschema is the object of stock schema and stock is stockSchema

export default Stock;