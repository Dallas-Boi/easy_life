// Made Tuesday, Januray 9th, 2024
import { GetHeader } from '@/elm/header'
import { Profile } from '@/elm/profile'

// Page
export default function Dashboard() {
    return (
        <>
            <GetHeader />
            <div id="main">
                <Profile />
            </div>
        </>
    )
}

