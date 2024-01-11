
import Script from 'next/script'
import { useState } from 'react'
import { MessageBox } from '@/components/client'
import { getSortedPostsData } from '../lib/posts';
// Page
export default function Dashboard() {
    return (
        <>
            <LogIn />
        </>
    )
}