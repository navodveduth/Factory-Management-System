import mongoose from "mongoose";

const Schema =  mongoose.Schema;
const orderSchema = new Schema({

    invoiceNo: {
        type: String,
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
        type: String,
        required:true
    },
    unitQty:{
        type: String,
        required:true
    },
    totalMatCost:{
      type: String,
      required:true
    },
    overHeadCost:{
        type: String,
        required:true
    }
});

const orderCost = mongoose.model("OrderCost",orderSchema);
export default orderCost;

