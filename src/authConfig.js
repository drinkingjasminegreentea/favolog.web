export const msalConfig = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AUTHCLIENTID,
    authority: process.env.NEXT_PUBLIC_AUTHORITY,
    knownAuthorities: ['favolog.b2clogin.com'],
    redirectUri: process.env.NEXT_PUBLIC_REDIRECTURI,
    postLogoutRedirectUri: process.env.NEXT_PUBLIC_REDIRECTURI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}
