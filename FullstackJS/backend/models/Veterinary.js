import mongoose from "mongoose";

const veterinarySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null,
    },
    token: {
    
    },
    confirmed: {
        type: Boolean,
        default: false,
    }
})

const Veterinary = mongoose.model("Veterinary", veterinarySchema);

export default Veterinary;