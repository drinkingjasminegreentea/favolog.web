import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect } from 'react'
import { UserContext } from '../src/UserContext'
import { ActivePages, PageContext } from '../src/PageContext'
import FeedItemCard from '../components/item/FeedItemCard'
import { useSWRInfinite } from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { UnauthenticatedTemplate } from '@azure/msal-react'

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
        if (response.ok) {
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
  const PAGE_SIZE = 12

  if (user) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.id}`
    fetcher = fetchUserFeed
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`
    fetcher = fetchDiscoverFeed
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (index) => `${url}?pageSize=${PAGE_SIZE}&pageIndex=${index + 1}`,
    fetcher
  )

  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  const feed = data ? [].concat(...data) : []
  if (error) return <div>Failed to load. Please refresh.</div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />
  return (
    <>
      <UnauthenticatedTemplate>
        <Alert variant='info'>
          <span>
            Favolog let's you catalog all your favorite things and share them
            with your followers. Sign in to get started!
          </span>
        </Alert>
      </UnauthenticatedTemplate>
      {isEmpty && (
        <Alert variant='info'>
          <Alert.Heading>Welcome!</Alert.Heading>
          <span>
            Create your first catalog and share your favorites by clicking on
            the plus button. Explore and find people to follow.
          </span>
        </Alert>
      )}
      <div className={styles.catalog}>
        {feed.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
      {!isReachingEnd && (
        <Button
          disabled={isLoadingMore || isReachingEnd}
          variant='secondary'
          className={styles.loadMore}
          onClick={() => setSize(size + 1)}
        >
          {isLoadingMore ? 'Loading...' : 'Load more'}
        </Button>
      )}
    </>
  )
}
