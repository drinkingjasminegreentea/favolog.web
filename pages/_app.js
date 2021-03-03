import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "../src/authConfig"
import Layout from '../components/Layout/Layout'
import {useState} from 'react'
import { useRouter } from 'next/router'
import {UserContext} from '../src/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {  
  const msalInstance = new PublicClientApplication(msalConfig)  
  const [user, setUser] = useState()  
  const router = useRouter()

  const postUser = async (authResult) => {        
    const claims = authResult.idTokenClaims    

    const user = {
        emailAddress: claims.emails[0],
        firstName: claims.given_name,
        lastName: claims.family_name,                
        externalId: claims.sub
    }   
    
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
        method: "POST",
        headers: {            
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => setUser(data))
  }
  
  const signIn = () => {
    msalInstance.loginPopup()
      .then((result)=> {
          postUser(result)
      })
      .catch((error)=>{console.error('error:', error)})
  }

  const signOut = () => {    
    msalInstance.logout()
    .then(()=> setUser())
    .then(()=> router.push(`/`))
  }
      
  return (
    <MsalProvider instance={msalInstance}>
      <UserContext.Provider value={{user, signIn, signOut, setUser}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserContext.Provider>
    </MsalProvider>    
  )
}

export default MyApp
