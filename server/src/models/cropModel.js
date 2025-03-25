import mongoose from "mongoose"

const CropSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    variety: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type:String,
        enum: ['Planted', 'Germinated', 'Growing', 'Flowering', 'Fruiting' ,'Matured', 'Harvested'],
        default:"Planted"
    },
    planting_date: {
        type: Date,
         required: true,   
    },
    expected_date: {
        type: Date,
         required: true,
        },
    
},{timestamps: true})
export default mongoose.model('Crop', CropSchema )