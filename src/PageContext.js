import { createContext, useState } from 'react'

export const PageContext = createContext()

export const ActivePages = {
  home: 1,
  explore: 2,
}

export const PageContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(null)

  return (
    <PageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </PageContext.Provider>
  )
}
