import { createContext, useState, useContext, useEffect } from 'react'
import { AuthContext } from './AuthContext'

export const PageContext = createContext()

export const ActivePages = {
  home: 1,
  explore: 2,
}

export const PageContextProvider = ({ children }) => {
  const defaulOGInfo = {
    url: process.env.NEXT_PUBLIC_REDIRECTURI,
    image: 'https://favolog.blob.core.windows.net/appimages/Logo.png',
    title: 'Favolog - Catalog and Share Your Favorite Things',
    description: 'Catalog and Share Your Favorite Things',
  }
  const [activePage, setActivePage] = useState(null)
  const { currentUser } = useContext(AuthContext)
  const [catalogs, setCatalogs] = useState(null)
  const [openGraphInfo, setOpenGraphInfo] = useState(defaulOGInfo)
  const [catalogRefresh, setCatalogRefresh] = useState(false)

  const loadCatalogs = () => {
    if (currentUser) {
      acquireToken().then((accessToken) => {
        fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/catalog`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => {
            if (response.ok) return response.json()
            return Promise.reject(response)
          })
          .then((data) => setCatalogs(data))
          .catch((error) => {
            console.log('Something went wrong.', error)
          })
      })
    }
  }

  useEffect(() => {
    setCatalogRefresh(false)
    //loadCatalogs()
  }, [catalogRefresh])

  //if (!catalogs) loadCatalogs()

  return (
    <PageContext.Provider
      value={{
        activePage,
        setActivePage,
        catalogs,
        setCatalogRefresh,
        openGraphInfo,
        setOpenGraphInfo,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}
