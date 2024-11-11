import mongoose from "mongoose";


const dbname = "priceTracker"
export async function connectDB() {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) return console.log("MongoDB URI not defined")

    try {
          const db =  await mongoose.connect(process.env.MONGODB_URI+`/${dbname}`)
          const connection = mongoose.connection
              
        if(db){

            console.log('mongoDB connected successfully')
        }
        connection.on('error',(e)=>{
           throw new Error("error occured in DB connection") 
       })

    } catch (error:any) {
        console.log("Error occured failed to connect with database:" , error.message)   
        process.exit(1)
    }

}