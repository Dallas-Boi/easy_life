
import Script from 'next/script'
import { GetHeader } from '@/components/elements/header'
import { GetChatBox } from '@/components/chat'
import { cookies } from 'next/headers'

// Page HTML
export default async function Dashboard() {
    return (
        <>
            <GetHeader />
            <div id="main">
                <GetChatBox />
            </div>
        </>
    )
}