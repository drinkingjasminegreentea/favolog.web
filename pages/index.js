import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../src/UserContext'
import FeedItemCard from '../components/FeedItemCard'

export default function Page() {
    const {user} = useContext(UserContext)
    const [feedItems, setFeedItems] = useState([])

    useEffect(()=>{
        if (user){
            fetch(`http://localhost/favolog.service/api/user/${user.username}/feed`)
                .then(response => response.json())
                .then(data => setFeedItems(data))
        }        
    }, [user])

    return <div className={styles.catalog}>        
      {feedItems && feedItems.map((item) => (        
        <FeedItemCard key={item.id} item={item}/>
      ))}    
    </div>  
}

