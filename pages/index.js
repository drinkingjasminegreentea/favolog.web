import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/UserContext'
import { ActivePages, PageContext } from '../src/PageContext'
import { useMsal } from '@azure/msal-react'
import FeedItemCard from '../components/item/FeedItemCard'
import Alert from 'react-bootstrap/Alert'

export default function Page() {
  const { instance, accounts } = useMsal()
  const { user } = useContext(UserContext)
  const { setActivePage } = useContext(PageContext)
  const [feedItems, setFeedItems] = useState([])
  const [emptyFeed, setEmptyFeed] = useState(false)
  const { acquireToken } = useContext(UserContext)

  const fetchDiscoverFeed = (accessToken) => {
    setEmptyFeed(true)
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`, {
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
      .then((data) => {
        setFeedItems(data)
      })
      .catch((error) => {
        console.log('Something went wrong.', error)
      })
  }

  useEffect(() => {
    if (accounts.length > 0 && user) {
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
            } else fetchDiscoverFeed(response.accessToken)
          })
          .catch((error) => {
            console.log('Something went wrong.', error)
          })
      })
      setActivePage(ActivePages.home)
    }
  }, [user, accounts])

  return (
    <>
      {emptyFeed && (
        <Alert variant='secondary'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Create your favorites catalogs by clicking on the plus button.
            Search and find people to follow.
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
