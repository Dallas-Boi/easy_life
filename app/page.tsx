
import Script from 'next/script'
import { GetHeader } from '@/components/client'
import { cookies } from 'next/headers'

// Page HTML
export default async function Dashboard() {
    return (
        <>
            <GetHeader />
        </>
    )
}