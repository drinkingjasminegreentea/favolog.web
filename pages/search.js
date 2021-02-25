import ListGroup from 'react-bootstrap/Dropdown'
import styles from '../styles/SearchResults.module.css'
import Link from 'next/link'

export default function Search({searchQuery, results}) {
  
  return <div> 
      <span>Search results {searchQuery}</span>
      <h2>Users</h2>
      <ListGroup className={styles.searchContent}>
      {results.users.map((item) => (
        <Link href={`/user/${item.username}`} key={item.id}><ListGroup.Item as='li' action='false'> {item.username} </ListGroup.Item></Link>  
      ))}
      </ListGroup>
      <h2>Catalogs</h2>
      <ListGroup className={styles.searchContent}> 
      {results.catalogs.map((item) => (
        <Link href={`/catalog/${item.id}`} key={item.id}><ListGroup.Item as='li' action='false'> {item.name} </ListGroup.Item></Link>
      ))}
      </ListGroup>      
      <h2>Items</h2>
      <ListGroup className={styles.searchContent}>
      {results.items.map((item) => (
        <Link href={`test`} key={item.id}><ListGroup.Item as='li' action='false'> {item.title} </ListGroup.Item></Link>  
      ))}
      </ListGroup>      
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

