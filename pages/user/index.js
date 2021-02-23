import styles from '../../styles/CommonStyles.module.css'
import CatalogCard from '../../components/CatalogCard'
import { useEffect, useState } from 'react';
import { useMsal } from "@azure/msal-react";

export default function User() {
  const { instance } = useMsal();
  const accounts = instance.getAllAccounts()
  const [catalogs, setCatalogs] = useState([]);

  async function fetchData(){            
    if (accounts.length > 0){
      const userId = accounts[0].localAccountId;
      const res = await fetch(`http://localhost/favolog.service/api/catalog/GetUserCatalogOverview?externalId=${userId}`)    
      const catalogs = await res.json()
      return catalogs;
    }      
  }

  useEffect(() => {    
    fetchData()
      .then(items => {        
        setCatalogs(items)
      })  
  }, [])

    return <> 
          <div className={styles.catalog}>
          {catalogs && catalogs.map((catalog) => (
            <CatalogCard key={catalog.id} catalog={catalog}/>
          ))}
          </div>
    </>
  }  

  