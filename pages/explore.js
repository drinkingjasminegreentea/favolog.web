import styles from '../styles/CatalogStyles.module.css'
import { useEffect, useState } from 'react'
import FeedItemCard from '../components/FeedItemCard'

export default function Page() {  
  const [feedItems, setFeedItems] = useState([])
  
  useEffect(()=>{      
    fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`)
    .then(response => response.json())
    .then(data => setFeedItems(data))    
  }, [])

  return <div className={styles.catalog}>        
    {feedItems && feedItems.map((item) => (        
      <FeedItemCard key={item.id} item={item}/>
    ))}    
  </div>
}

