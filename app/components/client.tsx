// Made Thursday, Decemeber 21st, 2023

'use client' // Client Script
//
import React, { useState, FormEvent } from 'react'
import { useForm, SubmitHandler } from "react-hook-form";
import {getData} from '@/components/server'

//import { MCard } from '@/components/global_elm'
var count = 0
const setCount = () => {
  count += 1
}
// Counter Example
function Counter() {
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount()}>Click me</button>
    </div>
  )
}

// When called it will allow the form data to be readable
function readForm(formList: string) {
    var newData = {}
    for (var i=0; i < formList.length; i++) {
        if (formList){}
    }
}   

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
    // When the User submits
    async function onSub(formData: FormData) {
        // Checks if the password and confirm password is the same
        if (formData.get('pword') !== formData.get('con_pword')) {
            setErrors("Passwords Do Not Match")
            return
        }
        // All the form data in an dictionary
        const rawFormData = {
            username: formData.get('name'),
            password: formData.get('pword'),
        }
        console.log(rawFormData)
        // mutate data
        // revalidate cache
        fetch('../api/database', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawFormData),
        })
    }

    // Returns the HTML
    return (
        <form action={onSub}>
            <input name="name" placeholder='username' minLength={5} required/>
            <input type="password" name="pword" placeholder='password' minLength={8} required/>
            <input type="password" name="con_pword" placeholder='Confirm Password' />
            <button type="submit">SignUp</button><br />
            <p >{error}</p>
        </form>
    )
}

// Exports all the functions
export {
  Counter,
  MCard,
  SignUpBox
}