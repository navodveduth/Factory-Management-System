import mongoose from "mongoose"; // Import mongoose //

const Schema = mongoose.Schema;
const welfareSubscriptionSchema = new Schema({
    employeeNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 4,
        maxlength: 4,
    },
    welfarefacilityName: {
        type: String,
        required: true,
        maxlength: 100,
    }
});

const WelfareSubscription = mongoose.model("welfareSubscription", welfareSubscriptionSchema);

export default WelfareSubscription;