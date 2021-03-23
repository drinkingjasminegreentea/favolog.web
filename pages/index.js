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
            Add your favorite item to a catalog by clicking on the plus button.
            Discover, search and find people to follow. Here are few of the
            latest added favorites by our users.
          </span>
        </Alert>
      )}
      {data.guestUser && (
        <Alert variant='info'>
          <span>
            Favolog is a place where you can catalog all of your favorite things
            in the world, which may include products, places, books, movies, or
            anything else, and share them with your followers. Sign in to start
            creating, sharing, and discovering.
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
