
//cluster is a data storage -> has schema (like collections) defines ->> has documents

//importing dependencies
import mongoose from "mongoose";
//instantiating a schema
const Schema = mongoose.Schema;

//defining the structure of the schema
const damagedStockSchema = new Schema({
    //backend validations are done here
    stockCode: {
        type: String,
        unique:true,
        min:5,
        max:8,
        required:true,
    },
    damagedStockName: {
        type: String,
        required: true,
    },
    damagedStockCategory: {
        type: String,
        required: true,
        enum: ['Raw materials', 'Work in progress', 'Finished goods'],
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
    value: {
        type: Number,
        required: true,
        min: 0.0,
        default: 0.0,
    },
    totalValue: {
        type: Number,
        min: 0,
        default: 0.0,
    },
    usability: {
        type: String,
        required: true,
        enum: ['Usable', 'Not usable']
    },
})

//DamagedStock is inside the schema -> DamagedStock is part of the collections
const DamagedStock = mongoose.model("damagedStock", damagedStockSchema); //stockschema is the object of stock schema and stock is stockSchema


export default DamagedStock;