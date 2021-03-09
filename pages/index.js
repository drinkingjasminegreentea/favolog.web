import styles from '../styles/CatalogStyles.module.css'
import { useContext, useEffect, useState } from 'react'
import {UserContext} from '../src/UserContext'
import FeedItemCard from '../components/FeedItemCard'
import {useIsAuthenticated, useMsal} from '@azure/msal-react'

export default function Page() {  
  const isAuthenticated = useIsAuthenticated()
  const {instance, accounts} = useMsal()
  
  const {user} = useContext(UserContext)    
  const [feedItems, setFeedItems] = useState([])
  
  useEffect(()=>{      
      if (isAuthenticated && user){
          const silentRequest = {
            account: accounts[0],
            scopes: ["https://favolog.onmicrosoft.com/api/access"]
          }            

          instance.acquireTokenPopup(silentRequest)          
          .then((response) =>{
            console.log(response)
            // fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed/user/${user.username}`)
            // .then(response => response.json())
            // .then(data => setFeedItems(data))
          })       
      } else{
        // fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/feed`)
        //       .then(response => response.json())
        //       .then(data => setFeedItems(data))
      }      
  }, [user, isAuthenticated])

  return <div className={styles.catalog}>        
    {feedItems && feedItems.map((item) => (        
      <FeedItemCard key={item.id} item={item}/>
    ))}    
  </div>
}

