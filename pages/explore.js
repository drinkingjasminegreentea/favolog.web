import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useState, useContext } from 'react'
import FeedItemCard from '../components/item/FeedItemCard'
import { ActivePages, PageContext } from '../src/PageContext'

export default function Page() {
  const [feedItems, setFeedItems] = useState([])
  const { setActivePage } = useContext(PageContext)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`)
      .then((response) => response.json())
      .then((data) => setFeedItems(data))
    setActivePage(ActivePages.explore)
  }, [])

  return (
    <div className={styles.catalog}>
      {feedItems.map((item) => (
        <FeedItemCard key={item.id} item={item} />
      ))}
    </div>
  )
}
