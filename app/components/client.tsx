// Made Thursday, Decemeber 21st, 2023

'use client' // Client Script
// Imports
import React, { useState, FormEvent } from 'react'
import { redirect } from 'next/navigation'
import { encryptMsg } from '@/components/crypt'
import { useCookies } from 'react-cookie';

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

// Returns the SignUp box
function SignUpBox() {
    const [error, setErrors] = useState(""); 
	const [cookies, setCookie, removeCookie] = useCookies(['u_n']);
    // When the User submits
    async function onSub(formData: FormData) {
        // Checks if the password and confirm password is the same
        if (formData.get('pword') !== formData.get('con_pword')) {
            setErrors("Passwords Do Not Match")
            return
        }
        var pwor = encryptMsg(formData.get('pword'))
        // All the form data in an dictionary
        var accData = {
            type: "signup",
            username: formData.get('name'),
            pword: (await pwor).toString(),
        }

        // Sends Data to the API 
        const makeAcc = await fetch('../api/database', {
            method: 'POST',
            headers: {
            'Content-Type' : 'application/json; charset=utf8'
            },
            body: JSON.stringify(accData),
        })
        console.log(makeAcc.status)
        console.log(makeAcc.statusText)
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
        setCookie("u_n", )
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
    // Variables
    const [sub, setSub] = useState("") // href link
    const [txt, setTxt] = useState("") // link text
    const [dis, setDis] = useState("") // display name text

	// gets the cookie data for this users account
	const [cookies, setCookie, removeCookie] = useCookies(['user']);

	// if the user does not have an account cookie
	const AccCheck = () => {
		if (cookies["user"] == undefined) {
			return [
				<a href="/signup">Sign Up</a>,
				<a href="/login">Login</a>
			]
		} else {
			return <a href="/profile">Profile</a>
		}
	}
	console.log('Cookies: ', cookies["user"]);
    // Sends Data to the API 
	/* const getAcc = await fetch('../api/database', {
		method: 'GET',
		headers: {
		'Content-Type' : 'application/json; charset=utf8'
		},
		body: JSON.stringify({"a":""}),
	})
	console.log(getAcc.body) */

    // Returns the header
    return (
        <div id="header">
            <div id="links">
                <a href="/">Home</a>
                <AccCheck />
            </div>
            <div id="disName">
				{dis}
            </div>
        </div>
    )
}

// Exports all the functions
export {
  	MCard,
  	SignUpBox,
  	GetHeader
}