export const msalConfig = {
    auth: {
      clientId: '27c33eb6-5f97-4ca2-8bd5-e6e12a2f0455', 
      authority: 'https://favolog.b2clogin.com/favolog.onmicrosoft.com/B2C_1A_signup_signin',
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
