import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useContext } from 'react'
import FeedItemCard from '../components/item/FeedItemCard'
import { ActivePages, PageContext } from '../src/PageContext'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'

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
        if (response.ok) return response.json()
        return Promise.reject(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <Spinner animation='grow' />
  return (
    <>
      <div className={styles.catalog}>
        {data.items.map((item) => (
          <FeedItemCard key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
