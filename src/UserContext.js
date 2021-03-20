import { createContext, useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const { instance, accounts } = useMsal()
  const [user, setUser] = useState()
  const scopes = [process.env.NEXT_PUBLIC_API_SCOPE]

  const acquireToken = async (account) => {
    const response = await instance.acquireTokenSilent({
      account: account || accounts[0],
      scopes,
    })

    if (!response || !response.accessToken)
      throw new Error('Unable to acquire token', response)

    return response.accessToken
  }

  const postUser = async (account) => {
    const claims = account.idTokenClaims
    console.log('claims', claims)
    const user = {
      username: claims.name,
      firstName: claims.given_name,
      lastName: claims.family_name,
      externalId: claims.sub,
    }

    if (claims.emails && claims.emails.length > 0)
      user.emailAddress = claims.emails[0]

    acquireToken(account)
      .then((accessToken) => {
        fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (response.ok) return response.json()
            else return Promise.reject(response)
          })
          .then((data) => setUser(data))
      })
      .catch((error) => {
        console.error('Something went wrong.', error)
      })
  }

  const signIn = () => {
    instance
      .loginRedirect({ scopes })
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
    if (accounts.length > 0 && !user) postUser(accounts[0])
  }, [accounts])

  return (
    <UserContext.Provider
      value={{ user, setUser, signIn, signOut, acquireToken }}
    >
      {children}
    </UserContext.Provider>
  )
}
