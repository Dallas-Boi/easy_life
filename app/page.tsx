
import {GetHeader} from '@/components/server';
import Script from 'next/script'
import {Counter} from '@/components/client'
import {getData} from './components/server'
import { cookies } from 'next/headers'

export default async function Dashboard() {
  // Gets the Cookie from the client
  const cookieStore = cookies()
  const uid = cookieStore.get('id')
  console.log(uid)
  // Gets the data from db
  const data = await getData("12")
  var name = "Sign In"
  // Checks if the account doesn't exist
  if (data !== undefined) {
    name = data["username"]
  }
 
  return (
   <>
        <h1>{name}</h1>
        <GetHeader />
        <Counter />
    </>
  )
}