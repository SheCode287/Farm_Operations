import mongoose from "mongoose";


const ResourceModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    unit: {
        type: String,
        enum: ['kg', 'liters', 'units', 'bags'],
        required: true
    },
    usage_status: {
        type: String,
        enum: ['Available', 'In Use', 'Depleted'],
        default: 'Available'
    }
}, { timestamps: true });

export default mongoose.model('Resource', ResourceModel);
