import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/UserContext'
import { ActivePages, PageContext } from '../src/PageContext'
import { useMsal, useIsAuthenticated } from '@azure/msal-react'
import FeedItemCard from '../components/item/FeedItemCard'
import Alert from 'react-bootstrap/Alert'

export default function Page() {
  const { accounts } = useMsal()
  const { isAuthenticated } = useIsAuthenticated()
  const { user } = useContext(UserContext)
  const { setActivePage } = useContext(PageContext)
  const [feedItems, setFeedItems] = useState([])
  const [newUser, setNewUser] = useState(false)
  const [guestUser, setGuestUser] = useState(false)
  const { acquireToken } = useContext(UserContext)

  const fetchDiscoverFeed = () => {
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response)
      })
      .then((data) => {
        setFeedItems(data)
      })
      .catch((error) => {
        console.log('Something went wrong.', error)
      })
    setActivePage(ActivePages.home)
  }

  useEffect(() => {
    if (accounts && accounts.length == 0) {
      fetchDiscoverFeed()
      setGuestUser(true)
      setNewUser(false)
    }
  }, [accounts])

  useEffect(() => {
    if (user) {
      acquireToken().then((accessToken) => {
        fetch(
          `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.id}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
          .then((response) => {
            if (response.ok) return response.json()
            return Promise.reject(response)
          })
          .then((data) => {
            if (data.length > 0) {
              setFeedItems(data)
              setNewUser(false)
              setGuestUser(false)
            } else {
              setNewUser(true)
              setGuestUser(false)
              fetchDiscoverFeed()
            }
          })
          .catch((error) => {
            console.log('Something went wrong.', error)
          })
      })
    }
    setActivePage(ActivePages.home)
  }, [user])

  return (
    <>
      {newUser && (
        <Alert variant='info'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Create your favorites catalogs by clicking on the plus button.
            Search and find people to follow.
          </span>
        </Alert>
      )}
      {guestUser && (
        <Alert variant='info'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Sign in to start creating and sharing your favorites catalogs.
          </span>
        </Alert>
      )}
      <div className={styles.catalog}>
        {feedItems.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
