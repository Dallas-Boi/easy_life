// Made Thursday, Decemeber 21st, 2023

'use client' // Client Script
// Imports
import React, { useState, useEffect, MouseEvent, FormEvent } from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useCookies } from 'react-cookie';
import { NavApps } from './navMenu'

// Returns a Card with the given ID
function MCard (cid:string, csuit:string, cnum:string, color:string, cls:string) {
    return (
        <div id={cid} className={cls}>
            <div className={`card_num color_${color}`}>{cnum}</div>
            <div className={`card_suit_top color_${color}`}>{csuit}</div>
            <div className={`card_suit_bottom color_${color}`}>{csuit}</div>
        </div>
    )
}

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

// Returns the SignUp box
function SignUpBox() {
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

// Returns the Header
const GetHeader = () => {
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
                    <a href="/profile" suppressHydrationWarning>Profile</a>
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
            return <nav id="clientName">{disName}</nav>
        }
        return <nav id="clientName">Sign In</nav>
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

// Exports all the functions
export {
  	MCard,
  	SignUpBox,
  	GetHeader
}