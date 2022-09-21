import mongoose from "mongoose";

const Schema = mongoose.Schema;

const maintainenceSchema = new Schema({

    Type : {
        type : String, 
        required : true
    },

    Description : {
        type : String,  
        required : true
    },

    LastMaintainedDate : {
        type : Date
    },
    nextServiceDate : {
        type : Date
    },
    others:{
       type: String
    }
});

const Maintainence = mongoose.model("maintainence" , maintainenceSchema);

export default Maintainence;