// Made Tuesday, Januray 30th, 2024
'use client'
import React, { useState, useEffect, MouseEvent, FormEvent } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useCookies } from 'react-cookie';

// Returns the SignUp box
export function SignUpBox() {
    const [error, setErrors] = useState("");
    // When the User submits
    async function onSub(formData: FormData) {
        // Checks if the password and confirm password is the same
        if (formData.get('pword') !== formData.get('con_pword')) {
            setErrors("Passwords Do Not Match")
            return
        }
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
            type: "signup",
            username: formData.get('name'),
            pword: de.data
        }
        
        // Sends Data to the API 
        const makeAcc = await fetch('../api/database', {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(accData),
        })

		// Checks the status
		if (makeAcc.status == 302) {
            setErrors("Username Taken")
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
		<form id="inpts" action={onSub} method="POST">
			<input name="name" placeholder='username' minLength={5} required/>
			<input type="password" name="pword" placeholder='password' minLength={8} required/>
			<input type="password" name="con_pword" placeholder='Confirm Password' />
			<button id="sub-btn" type="submit">Sign Up</button>
			<p>{error}</p>
		</form>
    )
}