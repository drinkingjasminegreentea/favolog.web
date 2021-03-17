import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../src/UserContext'
import { ActivePages, PageContext } from '../src/PageContext'
import Alert from 'react-bootstrap/Alert'
import FeedItemCard from '../components/item/FeedItemCard'
import useSWR from 'swr'

export default function Page() {
  const { setActivePage } = useContext(PageContext)
  const { user, acquireToken } = useContext(UserContext)

  useEffect(() => {
    setActivePage(ActivePages.home)
  }, [])

  const fetchDiscoverFeed = (url) => {
    return fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) return response.json()
        return Promise.reject(response)
      })
      .catch((error) => {
        console.log('Something went wrong.', error)
      })
  }

  const fetchUserFeed = (url) => {
    return acquireToken().then((accessToken) => {
      return fetch(url, {
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
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }
  let url = null
  let fetcher = null

  if (user) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.id}`
    fetcher = fetchUserFeed
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/`
    fetcher = fetchDiscoverFeed
  }

  const { data, error } = useSWR(url, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <>
      {data.newUser && (
        <Alert variant='info'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Create your favorites catalogs by clicking on the plus button.
            Search and find people to follow.
          </span>
        </Alert>
      )}
      {data.guestUser && (
        <Alert variant='info'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Sign in to start creating and sharing your favorites catalogs.
          </span>
        </Alert>
      )}
      <div className={styles.catalog}>
        {data.items.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
