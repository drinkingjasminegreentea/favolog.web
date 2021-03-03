import { MsalProvider } from "@azure/msal-react"
import { PublicClientApplication } from "@azure/msal-browser"
import { msalConfig } from "../src/authConfig"
import Layout from '../components/Layout/Layout'
import {UserContextProvider} from '../src/UserContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {  
  const msalInstance = new PublicClientApplication(msalConfig)    
       
  return (
    <MsalProvider instance={msalInstance}>
      <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </UserContextProvider>
    </MsalProvider>    
  )
}

export default MyApp
