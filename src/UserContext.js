import { createContext, useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'

export const scopes = ['https://favolog.onmicrosoft.com/api/access']
export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const { instance, accounts } = useMsal()
  const [user, setUser] = useState()

  const postUser = async (account) => {
    const claims = account.idTokenClaims

    const user = {
      firstName: claims.given_name,
      lastName: claims.family_name,
      externalId: claims.sub,
    }

    user.email = claims.emails && claims.emails[0]

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
    })
  }

  const signIn = () => {
    instance
      .loginPopup({ scopes })
      .then((result) => {
        postUser(result)
      })
      .catch((error) => {
        console.error('error:', error)
      })
  }

  const signOut = () => {
    instance
      .logout()
      .then(() => setUser())
      .then(() => router.push(`/`))
  }

  useEffect(() => {
    if (accounts.length > 0) postUser(accounts[0])
  }, [accounts])

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  )
}
