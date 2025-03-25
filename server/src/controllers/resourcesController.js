import resourcesModel from "../models/resourcesModel.js"

export const getAllResources =  async (req, res) => {
 const resources =  await resourcesModel.find({})
 res.status(200).json({
    message:"Request executed successfully",
    status: true,
    data:resources 
 })
}

export const createResource = async (req, res) => {
    const {name, quantity, type, unit, usage_status} = req.body
    if(!name || !quantity || !type || !unit || !usage_status){
        return res.status(400).json({message:"Please provide all the values", status: false})
    }
    const resource = await resourcesModel.create(req.body)
    res.status(200).json({
        message:"Request executed successfully",
        status: true,
        data:resource 
     })

}