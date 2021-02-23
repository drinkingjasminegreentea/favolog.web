import styles from '../../styles/CommonStyles.module.css'
import CatalogItem from '../../components/CatalogItem'

export default function User({ catalogs }) {
    return <>          
          <div className={styles.catalog}>
          {catalogs.map((catalog) => (
            <CatalogItem key={catalog.id} catalog={catalog}/>
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
        catalogs
      }
    }
  }

  