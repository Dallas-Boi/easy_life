// Made Friday, January 19th, 2024
// Models the way to use dynamic routes/API's

import type { NextApiRequest, NextApiResponse } from 'next'

// When Called this will get the data for the user
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    //const { key } = req.query
    console.log(res.params.key[0])
    const data = {
        test: "Hello"
    }
    return new Response(JSON.stringify(data), 
    {status:200, headers: {"Content-Type":'application/json'}})
}