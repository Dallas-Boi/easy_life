// Made Wednesday 1-10-24

//IMPORT MONGOOSE
import mongoose, { Model, Schema } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const DATABASE_URL = 'mongodb+srv://easyAccounts:7Cxc3YKmRTu9makT@accounts.ynq2yx1.mongodb.net/easyLife?retryWrites=true&w=majority'

// connection function
export const connect = async (data) => {
    const conn = await mongoose
        .connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")

    // OUR TODO SCHEMA
    const inpData = new Schema({
        _id: Number,
        username: String,
        password: String,
        completed: Boolean,
    })

    var id = 2
    
    // OUR TODO MODEL
    const mod = mongoose.model(`${id}`, inpData);
    const doc = new mod();
    // The Accounts Data
    doc._id = id;
    doc.username = data.username;
    doc.password = data.password
    // Saves the data
    await doc.save();
}