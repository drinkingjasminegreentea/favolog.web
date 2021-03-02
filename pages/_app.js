import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "../src/authConfig"
import Layout from '../components/Layout/Layout'
import {useState} from 'react'
import {UserContext} from '../src/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {  
  const msalInstance = new PublicClientApplication(msalConfig)  
  const [user, setUser] = useState()  

  const postUser = async (authResult) => {
    const claims = authResult.idTokenClaims

    const user = {
        emailAddress: claims.email,
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
  }
  
  if (!user){
    const allAccounts = msalInstance.getAllAccounts()  
    if (allAccounts.length > 0){
      postUser(allAccounts[0])
    }
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
