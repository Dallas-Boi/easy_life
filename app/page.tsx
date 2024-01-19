
import Script from 'next/script'
import {Counter, GetHeader} from '@/components/client'
import { cookies } from 'next/headers'


// Page HTML
export default async function Dashboard(req: Request) {
    console.log(req)
    return (
        <>
            <h1></h1>
            <GetHeader />
        </>
    )
}