
export const msalConfig = {
    auth: {
      clientId: "27c33eb6-5f97-4ca2-8bd5-e6e12a2f0455", 
      authority: "https://favolog.b2clogin.com/favolog.onmicrosoft.com/B2C_1A_signup_signin",
      knownAuthorities: ["favolog.b2clogin.com"],
      redirectUri: 'http://localhost:3000',
      postLogoutRedirectUri: 'http://localhost:3000'
    },
    cache: {
      cacheLocation: "localStorage",
      storeAuthStateInCookie: false
    }
  };