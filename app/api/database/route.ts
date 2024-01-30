// tuesday 1-9-24
//IMPORT MONGOOSE
import mongoose, { Model, Schema} from "mongoose"
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const DATABASE_URL = 'mongodb+srv://easyAccounts:7Cxc3YKmRTu9makT@accounts.ynq2yx1.mongodb.net/easyLife?retryWrites=true&w=majority'

// Connects to the database
const connect = async () => { 
    await mongoose.connect(DATABASE_URL as string)
        .catch(err => console.log(err))
    console.log("Mongoose Connection Established")
}

// When a user is made
export async function POST(req: Request, res: Response) {

    // Cookies Const
    const cooke = cookies() 
    // The Account data
    const data = await req.json();
    await connect() // Connects to the DB 
    var loc = req.headers.get("origin") // Host origin
    // Schema for Data
    const UserSchema = new Schema(
        {
            username: {type: String},
            password: {type: String},
            display: {type: String, default: "User"},
            email: {type: String, default: "None"},
            ranks: {type: Array, default: ["user"]},
            isBan: {type: String, default: "false"},
            banTime: {type: Number, default: 0}
        },
        { timestamps: true }
    );
        
    // exporting the type in order to have all the correct linting
    interface IUser extends Document {
        id: string;
        username: string;
        password: string;
        display: string;
        email?: string;
        ranks: Array<string> | string;
        isBan: string;
        banTime: number;
        createdAt: Date | number;
        updatedAt: Date | number;
    }
        
    // registering in mongoose models the schema with the relative interface
    const User = (mongoose.models.Accounts as Model<IUser>) || mongoose.model<IUser>("Accounts", UserSchema);

    // Gets all the users that have this username
    const users: Array<IUser> = await User.find({ username: data.username });

    // If the POST type equals "signUp"
    if (data.type == "signup") {
        
        // If a user does exist then it will tell the user that the username is taken
        if (users.length > 0) {return new Response("Received Data", {status:302})}

        // Creates a New User
        const newUser = await new User({
            username: data.username, 
            password: data.pword,
            display: data.username
        }).save()

        // En Data
        var edata = {
            type: "e",
            txt: (newUser.createdAt.toString().substring(0,10)).replace("-", "")
        }

        // Encrypts
        const en = await fetch(`${loc}/api/cryption`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(edata),
        }).then((response) => response.json())
        console.log(en.data)
        // Account Key
        var userKey = `${en.data}|${newUser.id}`
        // Sets the account Key
        var oneYear = 60*60*24*365
        cooke.set('_k', userKey, { maxAge: oneYear })
    } else if (data.type == "login") { // When login is called

        var ddata_s = {type: "d",txt: data.pword}
        var ddata_db = {type: "d",txt: users[0].password}
        // Decrypts Sent Pword
        const de_sent = await fetch(`${loc}/api/cryption`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(ddata_s),
        }).then((response) => response.json())
        // Decrypts db pword
        const de_db = await fetch(`${loc}/api/cryption`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(ddata_db),
        }).then((response) => response.json())
        
        // If the User Doesn't Exist
        if (users.length == 0) {return new Response("Received Data", {status:302})}
        // If the Users password is incorrect
        else if (de_db.data !== de_sent.data) {return new Response("Received Data", {status:303})}
        // Sets the cookie Key
        var userKey = `${users[0].password}|${users[0].id}`
        // Sets the account Key
        var oneYear = 60*60*24*365
        cooke.set('_k', userKey, { maxAge: oneYear})

    } else if (data.type == "userData") { // If the server needs the client data
        const uid = (cooke.get("_k").value).split("|")
        const users: Array<IUser> = await User.find({ _id: uid[1] });
        return NextResponse.json({username: users[0]["username"]})
    }
    // When the POST request was Successful
    return new Response("Data", {status:200})
}