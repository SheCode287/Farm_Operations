
import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
//routes
import cropRouter from "./routes/cropRouter.js"
import resourceRouter from "./routes/resourcesRouter.js"
import activityRouter from "./routes/actvitiesRouter.js"


const app = express()
const PORT = process.env.PORT || 8000

if(process.env.NODE_ENV === "development"){
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(cors())

//crops
app.use("/v1/crops", cropRouter)

//activities
app.use("/v1/activities", activityRouter)

//resources
app.use("/v1/resources", resourceRouter)

app.get("/", (req, res)=>{
    res.json({message: "Server is up and running"})
})

//Not Found middleware
app.use("*", (req, res) =>{
    res.status(404).json({message:"Not found", status: false})
})
//connect to MongoDB
const connectToDataBase = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT, () =>{
            console.log(`Server is running on PORT: ${PORT}`)
        })
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }


}
connectToDataBase()

