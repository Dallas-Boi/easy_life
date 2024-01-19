// tuesday 1-9-24
//IMPORT MONGOOSE
import mongoose, { Model, Schema, Connection } from "mongoose"
import { redirect } from 'next/navigation'

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const DATABASE_URL = 'mongodb+srv://easyAccounts:7Cxc3YKmRTu9makT@accounts.ynq2yx1.mongodb.net/easyLife?retryWrites=true&w=majority'

// Connects to the database
const connect = async () => { 
    await mongoose.connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")
}

// When a user is made
export async function POST(req: Request) {

    // The Account data
    const data = await req.json();
    await connect() // Connects to the DB 
    // If the POST type equals "signUp"
    if (data.type == "signup") {
        
        // Schema for Data
        const UserSchema = new Schema(
            {
                username: {type: String},
                password: {type: String},
                display_name: {type: String},
                email: {type: String, default: "None"},
                ranks: {type: Array}
            },
            { timestamps: true }
        );
          
          // exporting the type in order to have all the correct linting
        interface IUser extends Document {
            id: string;
            username: string;
            password?: string;
            email?: string;
            ranks: Array<string> | string;
            createdAt: Date | number;
            updatedAt: Date | number;
        }
          
        // registering in mongoose models the schema with the relative interface
        const User = (mongoose.models.Accounts as Model<IUser>) || mongoose.model<IUser>("Accounts", UserSchema);

        // Gets all the users that have this username
        const users: Array<IUser> = await User.find({ username: data.username });
        // If a user does exist then it will tell the user that the username is taken
        if (users.length > 0) {
            return new Response("Received Data", {status:302})
        }

        // Creates a New User
        const newUser = await new User({
            username: data.username, 
            password: data.pword,
            email: "None",
            ranks: ["user"]
        }).save()
        console.log("Made User")
    }
    // When the POST request was Successful
    return new Response("Received Data", {status:200})
}