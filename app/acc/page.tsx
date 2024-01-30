// Made Tuesday, Januray 9th, 2024
//import {SignUpBox} from '@/components/client';
import Script from 'next/script'
import { cookies } from 'next/headers'
import { FormEvent } from 'react'
import { ProfileItems, GetHeader } from '@/components/elements/header'
// Makes the page
export default function Dashboard() {
    
    // Returns the HTML
    return (
        <>
            <GetHeader />
            <div id="main">
                <Profile />
            </div>
        </>
    )
}

