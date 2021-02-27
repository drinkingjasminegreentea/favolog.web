import { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserContextProvider = () => {  
    const [user, setUser] = useState()

    return (
    <UserContext.Provider value={{user}}>
        {children}
    </UserContext.Provider>
    )    
}
