import styles from '../../styles/CommonStyles.module.css'
import CatalogCard from '../../components/CatalogCard'

export default function User({username, catalogs }) {
  return <>         
      <div className={styles.catalog}>
      {catalogs && catalogs.map((catalog) => (        
        <CatalogCard key={catalog.id} catalog={catalog}/>
      ))}
      </div>
    </>
  }
  
  export async function getServerSideProps({params}) {  
    const username = params.username;
    const res = await fetch(`http://localhost/favolog.service/api/catalog/GetUserCatalogOverview?username=${username}`)
    
    const catalogs = await res.json()
    
    return {
      props: {
        username,
        catalogs
      }
    }
  }

  