import mongoose from "mongoose";

const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: { type: String,
        required: true 
    },

    password: { 
        type: String,
        required: true }

});

const User = mongoose.model("users", usersSchema);

export default User;