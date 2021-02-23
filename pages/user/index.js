import styles from '../../styles/CommonStyles.module.css'
import CatalogItem from '../../components/CatalogItem'
import { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";

export default function User() {
  const { accounts } = useMsal();
  const [catalogs, setCatalogs] = useState([]);

  async function fetchData(){        
    if (accounts.length > 0){
      const userId = accounts[0].localAccountId;
      const res = await fetch(`http://localhost/favolog.service/api/catalog/GetUserCatalogOverview?uniqueExternalUserId=${userId}`)    
      const catalogs = await res.json()      
      console.log("catalogs", catalogs)
      return catalogs;
    }      
  }

  useEffect(() => {    
    console.log("useeffect")
    fetchData()
      .then(items => {
        setCatalogs(items)
      })  
  }, [])

    return <>          
          <div className={styles.catalog}>
          {catalogs && catalogs.map((catalog) => (
            <CatalogItem key={catalog.id} catalog={catalog}/>
          ))}
          </div>
    </>
  }  

  