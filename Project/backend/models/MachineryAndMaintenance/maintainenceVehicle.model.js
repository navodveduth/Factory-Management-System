import mongoose from "mongoose";

const Schema = mongoose.Schema;

const maintainenceVehicleSchema = new Schema({

    vehicleNo:{
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true,
    },

    Description : {
        type : String,  
        required : true
    },

    performedBy : {
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
    }
});

const MaintainenceVehicle = mongoose.model("maintainenceVehicle" , maintainenceVehicleSchema);

export default MaintainenceVehicle;