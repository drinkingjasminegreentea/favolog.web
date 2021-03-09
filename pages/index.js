import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import { UserContext, scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'
import FeedItemCard from '../components/FeedItemCard'

export default function Page() {
  const { instance, accounts } = useMsal()
  const { user } = useContext(UserContext)
  const [feedItems, setFeedItems] = useState([])

  useEffect(() => {
    if (accounts.length > 0 && user) {
      const account = accounts[0]

      instance.acquireTokenSilent({ account, scopes }).then((response) => {
        fetch(
          `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.username}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${response.accessToken}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => setFeedItems(data))
      })
    } else {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`)
        .then((response) => response.json())
        .then((data) => setFeedItems(data))
    }
  }, [user, accounts])

  return (
    <div className={styles.catalog}>
      {feedItems &&
        feedItems.map((item) => <FeedItemCard key={item.id} item={item} />)}
    </div>
  )
}
