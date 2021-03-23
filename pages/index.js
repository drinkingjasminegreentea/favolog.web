import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../src/UserContext'
import { ActivePages, PageContext } from '../src/PageContext'
import Alert from 'react-bootstrap/Alert'
import FeedItemCard from '../components/item/FeedItemCard'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export default function Page() {
  const { setActivePage } = useContext(PageContext)
  const { user, acquireToken } = useContext(UserContext)
  const [pageIndex, setPageIndex] = useState(1)

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
        if (response.ok) {
          window.scrollTo(0, 0)
          return response.json()
        }
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
          if (response.ok) {
            window.scrollTo(0, 0)
            return response.json()
          }
          return Promise.reject(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }
  let url = null
  let fetcher = null

  if (user) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.id}?pageIndex=${pageIndex}`
    fetcher = fetchUserFeed
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/?pageIndex=${pageIndex}`
    fetcher = fetchDiscoverFeed
  }

  const { data, error } = useSWR(url, fetcher)

  const loadMore = () => {
    setPageIndex(pageIndex + 1)
  }

  if (error) return <div>Failed to load. Please refresh.</div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />
  return (
    <>
      {data.newUser && (
        <Alert variant='info'>
          <span>
            Create your first catalog and share your favorites by clicking on
            the plus button.
          </span>
        </Alert>
      )}
      {data.guestUser && (
        <Alert variant='info'>
          <span>
            Favolog let's you catalog all your favorite things and share them
            with your followers. Sign in to get started!
          </span>
        </Alert>
      )}
      <div className={styles.catalog}>
        {data.page.items.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
      {!data.newUser && !data.guestUser && data.page.hasNextPage && (
        <Button
          variant='secondary'
          className={styles.loadMore}
          onClick={loadMore}
        >
          Load more
        </Button>
      )}
    </>
  )
}
