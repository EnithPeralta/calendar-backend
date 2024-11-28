import mongoose from "mongoose";

export const dbConnection = async () =>{
    try {
        await mongoose.connect(process.env.DB_CNN)
        .then(()=> console.log("Connect to MongoDB Altas"))
    } catch (error) {
        console.log("Error al conectar mongoDB",error);
    }
}