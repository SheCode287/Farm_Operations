import activitiesModel from "../models/activitiesModel.js"
import cropModel from "../models/cropModel.js"
import mongoose from "mongoose"


export const getAllActivities =  async (req, res) => {
const activities = await activitiesModel.find({})
res.status(200).json({
    message: "Request executed successfully",
    status: true,
     data:activities
 })
}

export const createActivity = async (req, res) => {
    const {description, activity_date, crop_id, activity_type} = req.body
    if(!description ||!crop_id || !activity_date || !activity_type){
        return res.status(400).json({message:"Please provide all the values required", status: false})     
    }
    if (!mongoose.Types.ObjectId.isValid(crop_id)) {
        return res.status(400).json({ message: "Invalid crop ID", status: false });
    }

    const cropExists = await cropModel.findById(crop_id);
    if (!cropExists) {
        return res.status(404).json({ message: "Crop id not found", status: false });
    }
    const activities = await activitiesModel.create(req.body)
    res.status(200).json({
        message: "Request executed successfully",
        status: true,
         data:activities
     })
}