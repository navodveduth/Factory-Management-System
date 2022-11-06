import mongoose from "mongoose";

const Schema = mongoose.Schema;

const maintainenceSchema = new Schema({

    midprop:{
        type: String,
        required: true

    },

    Type : {
        type : String, 
        required : true
    },

    Description : {
        type : String,  
        required : true
    },
    others:{
       type: Number
    },

    status:{
        type: String
    },

    lastMaintainedDate : {
        type : Date,
        required : true

    },

    nextServiceDate : {
        type : Date,
        required : true
    },

    name: {
        type: String,
        required: true,
    },
});

const Maintainence = mongoose.model("maintainence" , maintainenceSchema);

export default Maintainence;