import mongoose from "mongoose";

const Schema = mongoose.Schema;

const machinerySchema = new Schema({
    machineID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        maxLength: 20,    
        
    },
    name : {
        type : String, 
        required : true
    },
    dateOfPurchased : {
        type : Date,
        required : true
    },

    machineryCost:{
        type: Number,
        required: true
     },
    
     salvage:{
         type: Number,
         required:true
     },
     numberOfYrs:{
         type: Number,
         required:true
     },
    others:{
        type: String,
        required:true
    },

   

});

const Machinery = mongoose.model("machinery" , machinerySchema);



export default Machinery ;




