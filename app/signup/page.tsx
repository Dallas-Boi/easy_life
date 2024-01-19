// Made Tuesday, Januray 9th, 2024
//import {SignUpBox} from '@/components/client';
import Script from 'next/script'
import { cookies } from 'next/headers'
import { FormEvent } from 'react'
import { SignUpBox } from '@/components/client'
// Makes the page
export default function Dashboard() {
    
    // Returns the HTML
    return (
        <>
            <div id="main">
                <SignUpBox />
            </div>
        </>
    )
}