import mongoose from "mongoose";

const Schema =  mongoose.Schema;
const orderSchema = new Schema({

    // invoiceNo,
    // orderName,
    // date,
    // materialCost,
    // qty,
    // total,
    // overhead


    invoiceNo: {
        type: String,
        required:true,
        unique:true
    },
    product: {
        type:String, 
        required:true,
    },
    materialCost:{
        type: Number,
        required:true
    },
    unitQty:{
        type: Number,
        required:true
    },
    requestDate:{
        type:Date,
        required:true
    },
    costedDate:{
        type:Date,
    },

    supervisor:{
        type: String,
    },
    teamLead:{
        type: String,
    },
    member1:{
        type: String,
    },
    member2:{
        type: String,
    },
    totalMatCost:{
      type: Number,
      required:true
    },
    budgetedMatCost:{
        type: Number,
        required:true
      },
    totalLabCost:{
        type:Number,
        required:true
    },
    budgetedLabCost:{
        type:Number,
        required:true
    },
    overHeadCost:{
        type: Number,
        required:true
    },
    budgetedoverHeadCost:{
        type: Number,
        required:true
    },
    totalCost:{
        type: Number,
        required:true
    },
    budgetedtotalCost:{
        type: Number,
        required:true
    },
    status:{
        type:String,
        required:true
    },
});

const orderCost = mongoose.model("OrderCost",orderSchema);
export default orderCost;

