import Link from 'next/link'
import UserCard from '../components/UserCard'
import styles from '../styles/CatalogStyles.module.css'

export default function Page({searchQuery, results}) {  

  return <div className={styles.searchResults}> 
      <span>Search results <b>'{searchQuery}'</b></span>
      <h2>Users</h2>
      <div className={styles.catalog}>
        {results.users.map((item) => (
          <UserCard key={item.id} user={item}/>
        ))}      
      </div>
      <h2>Catalogs</h2>      
      <div className={styles.catalog}>
        {results.catalogs.map((item) => (
          <Link href={`/catalog/${item.id}`} key={item.id}><span>{item.Name}</span></Link>
        ))}   
      </div>    
      <h2>Items</h2>      
      <div className={styles.catalog}>
        {results.items.map((item) => (
          <Link href={`/item/${item.id}`} key={item.id}><span>{item.title}</span></Link>  
        ))}       
      </div>       
    </div>
 }

export async function getServerSideProps({query}) {
  const searchQuery = query.q
  const res = await fetch(`http://localhost/favolog.service/api/Search?query=${searchQuery}`)  
  const results = await res.json()
  
  return {
    props: {
      searchQuery,
      results
    }
  }
}

