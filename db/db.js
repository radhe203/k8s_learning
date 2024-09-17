import mongoose from "mongoose";

const MongoHost = process.env.MONGO_HOST || "localhost"
const MongoPort = process.env.MONGO_PORT || 27017

export default function (){
    mongoose.connect(`mongodb://${MongoHost}:${MongoPort}/multi`)
    .then(()=>{
        console.log("MongoDb Connected")
    })
    .catch((err)=>{
        console.log(err)
    })
}