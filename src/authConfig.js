export const msalConfig = {
    auth: {
      clientId: process.env.NEXT_PUBLIC_AUTHCLIENTID, 
      authority: 'https://favolog.b2clogin.com/favolog.onmicrosoft.com/B2C_1_SignUpSignIn',
      knownAuthorities: ['favolog.b2clogin.com'],
      redirectUri: process.env.NEXT_PUBLIC_REDIRECTURI,
      postLogoutRedirectUri: process.env.NEXT_PUBLIC_REDIRECTURI,
      resourceUri: 'https://graph.windows.net'
    },
    cache: {
      cacheLocation: 'localStorage',
      storeAuthStateInCookie: false
    }
  }
