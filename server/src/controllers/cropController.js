 import CropModel from "../models/cropModel.js"
 const crops =[
    {
        name:"Coffee",
        variety:"Robusta",
        planting_date:"12/05/2024",
        harvest_date:"12/04/2025",
        status:"healthy",
        id:"1"
    }
 ]
export const getAllCrops =  async (req, res) => {
    const crops = await CropModel.find({})
 res.status(200).json({
    message: "Request executed successfully",
    status: true,
     data:crops
 })
}

export const createCrop = async (req, res) => {
    const {name, variety, planting_date,
        expected_date,status} = req.body
    if(!name || !variety || !planting_date || !expected_date || !status){
        return res.status(400).json({message:"Please provide all the values", status: false})  
    }
    const crop = await CropModel.create({
    name, variety, planting_date, expected_date, status
    })
    res.status(201).json({
        message: "Request executed successfully",
        status: true,
        data:crop
    })
}

export const getCrop = async (req, res) =>{
    const {id} = req.params
    const crop = await CropModel.findById(id)
    if(!crop){
    return res.status(404).json({message: `No crop with ${id} found`, status: false})
    }
    res.status(201).json({
        message: "Request executed successfully",
        status: true,
        data:crop
    })
}

export const updateCrop = async (req, res) => {
    const {id} = req.params
    const {name, variety, planting_date, expected_date, status} = req.body
    if(!name || !variety || !planting_date || !expected_date || !status){
        return res.status(400).json({message:"Please provide all the values", status: false})  
    }
    const updatedCrop = await CropModel.findByIdAndUpdate(id, req.body,{new:true})
    if(!updateCrop){
     return res.status(404).json({message: `No crop with ${id} found`, status: false})
    }
    res.status(201).json({
        message: "Request executed successfully",
        status: true,
        data: updatedCrop
    })
}
export const deleteCrop = async (req, res) => {
    const {id} = req.params
    const crop = await CropModel.findByIdAndDelete(id)
    if(!crop){
        return res.status(404).json({message: `No crop with ${id} found`, status: false})
    }
    res.status(201).json({
        message: "Request executed successfully",
        status: true,
        data:crop
    })
}