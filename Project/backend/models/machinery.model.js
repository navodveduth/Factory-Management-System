import mongoose from "mongoose";

const Schema = mongoose.Schema;

const machinerySchema = new Schema({
    name : {
        type : String, 
        required : true
    },
    dateOfPurchased : {
        type : Date,
        required : true
    },
    depreciation : {
        type : String,
        required : true
    },
    machineryCost:{
       type: Number,
       required: true
    },
    others:{
        type: String,
        required:true
    }
});

const Machinery = mongoose.model("machinery" , machinerySchema);

export default Machinery ;




