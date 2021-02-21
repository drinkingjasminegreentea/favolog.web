import styles from '../../styles/CommonStyles.module.css'
import CatalogItem from '../../components/CatalogItem'
import { useMsal } from "@azure/msal-react";

export default function User({ catalogs }) {
    return <>
          <h1>Favorite things</h1>
          <div className={styles.catalog}>
          {catalogs.map((catalog) => (
            <CatalogItem key={catalog.id} catalog={catalog}/>
          ))}
          </div>
    </>
  }
  
  export async function getServerSideProps(context) {  
    console.log(context)
    //const { accounts } = useMsal();

    //const userId = accounts[0].localAccountId;
    const userId = "fa2b0ef0-2c50-4af0-9493-0a1c40856d92"
    const res = await fetch(`http://localhost/favolog.service/api/catalog/GetUserCatalogOverview?uniqueExternalUserId=${userId}`)
    
    const catalogs = await res.json()
    
    return {
      props: {
        catalogs
      }
    }
  }

  