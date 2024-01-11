// tuesday 1-9-24

import useSWR from 'swr';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from "next/server";
import { connect } from "@/components/database"

// Write a fetcher function to wrap the native fetch function and return the result of a call to the URL in JSON format


// When a user is made
export async function POST(req: Request) {
    // The Account data
    const data = await req.json();
    console.log(data);
    // Database Data
    // Add the new data to the object
    const newData = {
        username: data.username,
        pword: data.password
    }
    
    // Sends the Data to the DataBase
    connect(newData)
    //res.status(200).json({ message: 'Data stored successfully' });
    return new Response("Received SignIn", {status:200})
}