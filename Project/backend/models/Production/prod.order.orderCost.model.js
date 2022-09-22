import mongoose from "mongoose";

const Schema =  mongoose.Schema;
const orderSchema = new Schema({

    invoiceNo: {
        type: String,
        unique: true,
        required:true
    },
    orderName:{
        type: String,
        required:true
    },
    costDate:{
        type:String,
        required:true
    },
    materialCost:{
        type: Number,
        required:true
    },
    unitQty:{
        type: Number,
        required:true
    },
    totalMatCost:{
      type: Number,
      required:true
    },
    overHeadCost:{
        type: Number,
        required:true
    }
});

const orderCost = mongoose.model("OrderCost",orderSchema);
export default orderCost;

