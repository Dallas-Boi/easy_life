import Image from 'next/image'
import GetHeader from './components/global_elm';
import Script from 'next/script'
export default function Dashboard() {
  return (
   <>
        <GetHeader />
        <Script src="scripts/main.js" strategy="lazyOnload"/>
    </>
  )
}

