import mongoose from "mongoose";

const Schema = mongoose.Schema;

const maintainenceVehicleSchema = new Schema({

    vehicleNo:{
        type: String,
        required: true
    },

    name: {
        type: String
    },

    mileage: {  
        type: Number,
        required: true,
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

    performedBy : {
        type : String,  
        required : true
    },

    

     status:{
        type: String
    },

    others:{
        type: Number
     }
});

const MaintainenceVehicle = mongoose.model("maintainenceVehicle" , maintainenceVehicleSchema);

export default MaintainenceVehicle;