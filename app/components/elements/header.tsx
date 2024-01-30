// Made Thursday, Decemeber 21st, 2023

'use client' // Client Script
// Imports
import React, { useState, useEffect, MouseEvent, FormEvent } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useCookies } from 'react-cookie';
import { NavApps, NavName } from '../navMenu'

// Returns the Header
export const GetHeader = () => {
	// Allows the cookie to be accessed
	const [cookies, setCookie, removeCookie] = useCookies(['_k']);
    const [disName, setName] = useState("Sign In")
    // if the user does not have an account cookie
    async function onload() {
        // The info needed to identify the account
        const accInfo = {type: "userData"}

        // Sends Data to the API 
        const getAcc = await fetch(`../api/database`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(accInfo)
        }).then((response) => response.json())
      
        // All the data that was return with the ID
        console.log(getAcc.username)
        const dat = await getAcc.username
        return dat
    }
    // 
    useEffect(() => {
        if (cookies["_k"] !== undefined) { // If no cookie
            onload().then((n) => setName(n)) // Sets the clients name
        }
    })
    
    // Get Account Actions like Signin/signup
    function GetAccAct() {
        if (cookies["_k"] !== undefined) { // If no cookie
            return (
                <>
                    <a href="#" suppressHydrationWarning>Placeholder</a>
                    <a href="/logout" suppressHydrationWarning>Log Out</a>
                </>
            )
        }
        return (
            <>
                <a href="/signup" suppressHydrationWarning>Sign Up</a>
                <a href="/login" suppressHydrationWarning>Login</a>
            </>
        )
    }
    // Returns the Users name
    function GetAccName() {
        if (cookies["_k"] !== undefined) { // If no cookie
            return (
                <nav id="clientName" className="dropNav">
                    {disName}
                    <NavName data="logged"/>
                </nav>
            )
        }
        return (
            <nav id="clientName" className="dropNav">
                Sign In
                <NavName data="sign"/>
            </nav>
        )
    }

    // Returns the header
    return (
        <header id="header">
            <nav id="links">
                <a href="/">Home</a>
                <NavApps />
                <GetAccAct />
                <GetAccName/>
            </nav>
        </header>
    )
}

