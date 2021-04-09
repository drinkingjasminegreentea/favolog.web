import styles from '../styles/Feed.module.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../src/AuthContext'
import { ActivePages, PageContext } from '../src/PageContext'
import FeedItemCard from '../components/item/FeedItemCard'
import { useSWRInfinite } from 'swr'
import Spinner from 'react-bootstrap/Spinner'

export default function Page() {
  const { setActivePage } = useContext(PageContext)
  const { currentUser, getToken } = useContext(AuthContext)

  useEffect(() => {
    setActivePage(ActivePages.home)
  }, [])

  const fetchGuestFeed = (url) => {
    return fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const fetchUserFeed = (url) => {
    return getToken().then((token) => {
      return fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
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

  if (currentUser) {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user`
    fetcher = fetchUserFeed
  } else {
    url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`
    fetcher = fetchGuestFeed
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
      {feed.map((item) => (
        <FeedItemCard key={item.id} item={item} />
      ))}
      {!isReachingEnd && (
        <span className='center'>
          <button
            disabled={isLoadingMore || isReachingEnd}
            variant='secondary'
            className={styles.secondary}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore ? 'Loading...' : 'Load more'}
          </button>
        </span>
      )}
    </>
  )
}
