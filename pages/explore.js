import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useContext } from 'react'
import FeedItemCard from '../components/item/FeedItemCard'
import { ActivePages, PageContext } from '../src/PageContext'
import useSWR from 'swr'

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
        console.log('Something went wrong.', error)
      })
  }

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/`,
    fetcher
  )

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
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
