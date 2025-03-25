import mongoose from "mongoose";

const ActivitiesModel = new mongoose.Schema({
    crop_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Crop', 
        required: true
    },
    activity_type: {
        type: String,
        enum: ['Planting', 'Irrigation', 'Weeding', 'Fertilization', 'Pest Control', 'Harvesting'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    activity_date: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Activity', ActivitiesModel);
