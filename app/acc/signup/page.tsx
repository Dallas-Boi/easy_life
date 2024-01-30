// Made Tuesday, Januray 9th, 2024
import { GetHeader } from '@/components/elements/header'
import { SignUpBox } from '@/elm/signup'

// Page
export default function Dashboard() {
    return (
        <>
            <GetHeader />
            <div id="main">
                <SignUpBox />
            </div>
        </>
    )
}

