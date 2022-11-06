import mongoose from "mongoose";


const Schema = mongoose.Schema;

const maintainenceMachineSchema = new Schema({

    mid:{
        type: String,
        required:true

    },

    machineID:{
        type: String,
        required: true
    },

    Description : {
        type : String,  
        required : true
    },
   
    lastMaintainedDate : {
        type : Date,
        required : true

    },

    nextServiceDate : {
        type : Date,
        required : true
    },
 
     status:{
         type: String
     },

     Location:{
            type: String
        },

    contactNo:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 10,
        pattern: "^[0-9]{10}$",
    },

    others:{
        type: Number
     }

 
});

const MaintainenceMachine= mongoose.model("maintainenceMachine" , maintainenceMachineSchema);

export default MaintainenceMachine;