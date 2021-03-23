import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useContext, useState } from 'react'
import FeedItemCard from '../components/item/FeedItemCard'
import { ActivePages, PageContext } from '../src/PageContext'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'

export default function Page() {
  const { setActivePage } = useContext(PageContext)
  const [pageIndex, setPageIndex] = useState(1)

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
          window.scrollTo(0, 0)
          return response.json()
        }
        return Promise.reject(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed?pageIndex=${pageIndex}`,
    fetcher
  )

  const loadMore = () => {
    setPageIndex(pageIndex + 1)
  }

  if (error) return <div>failed to load</div>
  if (!data) return <Spinner className={styles.loading} animation='grow' />
  return (
    <>
      <div className={styles.catalog}>
        {data.page.items.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
      {data.page.hasNextPage && (
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
