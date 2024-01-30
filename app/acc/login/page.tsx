// Made Tuesday, Januray 30th, 2024
import Script from 'next/script'
import { useState } from 'react'
import { GetHeader } from '@/components/elements/header'
import { LoginBox } from '@/elm/login'
// Page
export default function Dashboard() {
    return (
        <>
            <GetHeader />
            <div id="main">
                <LoginBox />
            </div>
        </>
    )
}

