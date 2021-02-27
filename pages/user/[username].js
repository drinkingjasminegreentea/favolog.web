import styles from '../../styles/CatalogStyles.module.css'
import CatalogCard from '../../components/CatalogCard'
import ProfileInfo from '../../components/ProfileInfo'

export default function Page({user, catalogs }) {
  return <>
      <ProfileInfo user={user}/>    
      <div className={styles.catalog}>
        {catalogs && catalogs.map((catalog) => (        
          <CatalogCard key={catalog.id} catalog={catalog}/>
        ))}
      </div>
    </>
  }
  
  export async function getServerSideProps({params}) {      
    const username = params.username    
    
    const user = await fetch(`http://localhost/favolog.service/api/user/${username}`)
                  .then(response => response.json())     
    
    const catalogs = await fetch(`http://localhost/favolog.service/api/user/${username}/catalogs`)
                      .then(response => response.json())      

    return {
      props: {
        user, catalogs
      }
    }
  }

  