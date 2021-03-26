import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useContext, useState } from 'react'
import FeedItemCard from '../components/item/FeedItemCard'
import { ActivePages, PageContext } from '../src/PageContext'
import { useSWRInfinite } from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export default function Page() {
  const { setActivePage } = useContext(PageContext)

  useEffect(() => {
    setActivePage(ActivePages.explore)
  }, [])

  const fetcher = (url) => {
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
        console.error(error)
      })
  }

  const PAGE_SIZE = 12

  const { data, error, size, setSize } = useSWRInfinite(
    (index) =>
      `${
        process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL
      }/feed?pageSize=${PAGE_SIZE}&pageIndex=${index + 1}`,
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

  if (error) return <div>failed to load</div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />
  return (
    <>
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
