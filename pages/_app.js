import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "../config/authConfig";
import '../styles/globals.css'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {  
  const msalInstance = new PublicClientApplication(msalConfig);
  return (
    <MsalProvider instance={msalInstance}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MsalProvider>    
  )
}

export default MyApp
