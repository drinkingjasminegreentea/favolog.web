import { createContext, useState, useEffect } from 'react'
import {useMsal} from '@azure/msal-react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {       
    const {instance, accounts} = useMsal()
    const [ user, setUser ] = useState()

    const postUser = async (authResult) => {        
        const claims = authResult.idTokenClaims    
    
        const user = {
            emailAddress: claims.emails[0],
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
        instance.loginPopup()
          .then((result)=> {
              postUser(result)
          })
          .catch((error)=>{console.error('error:', error)})
      }
      
      const signOut = () => {    
        instance.logout()
        .then(()=> setUser())
        .then(()=> router.push(`/`))
      }

      useEffect(()=>{                
        if (accounts.length > 0)
            postUser(accounts[0])
      }, [accounts])
      
    return (
    <UserContext.Provider value={{user, setUser, signIn, signOut}}>
        {children}
    </UserContext.Provider>
    )    
}
