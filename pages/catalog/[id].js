import styles from '../../styles/CommonStyles.module.css'
import ItemCard from '../../components/ItemCard'
import { useMsal } from "@azure/msal-react"
import AddItem from '../../components/AddItem'
import {useState} from 'react'

export default function Catalog({ catalog }) {
    const { accounts } = useMsal();
    const editable = accounts.length > 0 && accounts[0].localAccountId == catalog.externalId;

    const [showModal, setShowModal] = useState(false);

    function toggleModalWindow(){
      setShowModal(!showModal)
    }
    
    return <>  
    <div className={styles.catalogHeader}>
      <h1> {catalog.name} </h1>
      {editable && <> 
        <img className={styles.button} onClick={toggleModalWindow}
          src='/icons/add.png'/>
        <img src='/icons/edit.png' className={styles.button}/>
        <AddItem show={showModal} parentAction={(toggleModalWindow)} catalogId={catalog.id}/> </>}
      </div>     
      <div className={styles.catalog}>
      {catalog.items.map((item) => (
        <ItemCard key={item.id} item={item}/>
      ))}
      </div>
    </>
  }
  
  export async function getServerSideProps({params}) {     
    const res = await fetch(`http://localhost/favolog.service/api/catalog/${params.id}`)
    
    const catalog = await res.json()
    return {
      props: {
        catalog
      }
    }
  }

  