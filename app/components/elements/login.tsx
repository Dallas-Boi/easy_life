// Made Tuesday, Januray 30th, 2024
'use client'
import React, { useState, useEffect, MouseEvent, FormEvent } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useCookies } from 'react-cookie';

// Returns the Login Box
export function LoginBox() {
    const [error, setErrors] = useState("");
    async function onLog(formData: FormData) {

        // Data to encrypt
        var ddata = {
            type: "e",
            txt: formData.get('pword')
        }
        // Fetch en
        const de = await fetch(`../api/cryption`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(ddata),
        }).then((response) => response.json())

        // All the form data in an dictionary
        var accData = {
            type: "login",
            username: formData.get('name'),
            pword: de.data
        }
        
        // Sends Data to the API 
        const logAcc = await fetch('../api/database', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(accData),
        })

		// Checks the status if the user exist
		if (logAcc.status == 302) {
            setErrors("Username or Password is Incorrect.")
            // Sets a timeout to change the error code 
            setTimeout(() => {
                setErrors("")
            }, 2000);
            return
		}

        // Checks the status
		if (logAcc.status == 303) {
            setErrors("Password is Incorrect.")
            // Sets a timeout to change the error code 
            setTimeout(() => {
                setErrors("")
            }, 2000);
            return
		}

        // If no errors occur then it will redirect the user back home
        redirect("/")
    }
    // Returns the HTML
    return (
		<form id="inpts" action={onLog} method="POST">
			<input name="name" placeholder='username' minLength={5} required/>
			<input type="password" name="pword" placeholder='password' minLength={8} required/>
			<button id="sub-btn" type="submit">Login</button>
			<p>{error}</p>
		</form>
    )
}