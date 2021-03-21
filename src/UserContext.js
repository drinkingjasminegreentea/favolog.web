import { createContext, useState, useEffect } from 'react'
import { useMsal } from '@azure/msal-react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const { instance, accounts } = useMsal()
  const [user, setUser] = useState(null)
  const scopes = [process.env.NEXT_PUBLIC_API_SCOPE]

  const updateUser = (data) => {
    if (!data) {
      localStorage.removeItem('user')
    } else {
      localStorage.setItem('user', JSON.stringify(data))
    }
    setUser(data)
  }

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
            if (response.ok) {
              return response.json()
            } else return Promise.reject(response)
          })
          .then((data) => updateUser(data))
      })
      .catch((error) => {
        console.error(error)
        instance.logout()
      })
  }

  const signIn = () => {
    instance
      .loginRedirect({ scopes })
      .then((result) => {
        postUser(result)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const signOut = () => {
    updateUser(null)
    instance.logout()
  }

  useEffect(() => {
    if (accounts.length > 0 && !user) {
      const localUser = JSON.parse(localStorage.getItem('user'))
      if (localUser) setUser(localUser)
      else postUser(accounts[0])
    }
  }, [accounts])

  return (
    <UserContext.Provider
      value={{ user, updateUser, signIn, signOut, acquireToken }}
    >
      {children}
    </UserContext.Provider>
  )
}
