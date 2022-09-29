import mongoose from "mongoose";

const Schema = mongoose.Schema; 
const SupplierSchema = new Schema({ 

    supplierId: {
        type: String,
        required: true,
        unique: true,
    },
    companyname: {
        type : String,
        required : true,//backend validation

    },
    contactPerson: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,

    },
    phone: {
        type : String,
        minlength: 10,
        maxlength: 10,
        unique: true,
        pattern: '^[0-9]{10}$',
        required: true,
    },
    address: {
        type : String,
        required: true,

    },
    productDetails: {
        type : String,
        required: true,
    },
    leadTime: {
        type : String,
        required: true,
    },
    orderCapacity: {
        type : String,
        required: true,
    },
});

const Supplier = mongoose.model("supplier", SupplierSchema);
export default Supplier;
