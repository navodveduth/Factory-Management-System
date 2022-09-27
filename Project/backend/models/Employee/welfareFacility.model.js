import mongoose from "mongoose"; // Import mongoose //

const Schema = mongoose.Schema;
const welfareFacilitySchema = new Schema({
    welfareFacilityName: {
        type: String,
        required: true,
        maxlength: 100,
    },
    welfareFacilityDescription: {   
        type: String,
        required: true,
        maxlength: 100,
    },
    welfareFacilityFee: {
        type: Number,
        required: true,
    }
});

const WelfareFacility = mongoose.model("welfareFacility", welfareFacilitySchema);

export default WelfareFacility;