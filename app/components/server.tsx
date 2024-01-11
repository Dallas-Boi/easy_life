// Made Wednesday, December 20th, 2023

import React from 'react';
import { format } from 'react-string-format';
// Gets the data needed from the DB
import data from '@/api/data.json'

// Returns the Header
const GetHeader = () => {
    return (
        <div id="header">
            <div id="links">
                <a href="/">Home</a>
                <a href="/login">Login</a>
            </div>
        </div>
    )
}

// Returns the data of the given id
async function getData(id:string) {
    try { 
        return JSON.parse(JSON.stringify(data))[id];
    } catch (err) {
        console.log(err)
        return "error"
    }
}

// Exports the items for other files to use
export {
    GetHeader,
    getData,
}
