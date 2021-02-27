import styles from '../../styles/CatalogStyles.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import ItemCard from '../../components/ItemCard'
import AddItem from '../../components/AddItem'
import {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../src/UserContext'
import Link from 'next/link'

export default function Page({ catalog, username }) {
    const { user } = useContext(UserContext)            
    const [isEditable, setIsEditable] = useState(false)    
    const [showModal, setShowModal] = useState(false)    
    
    useEffect(()=>{
      if (user){
        setIsEditable(user.id === catalog.userId)        
      }      
    }, [user])

    function toggleModalWindow(){
      setShowModal(!showModal)
    }
    
    return <>  
    <div className={styles.catalogHeader}>
      <h1> {catalog.name} </h1>
      <div className={styles.addEdit}>
      {isEditable &&  <>
        <img className={commonStyles.button} onClick={toggleModalWindow} src='/icons/add.png'/>
        <img src='/icons/edit.png' className={commonStyles.button}/>
        <AddItem show={showModal} parentAction={(toggleModalWindow)} catalogId={catalog.id}/> </>}
        {username && <Link href={`/user/${username}`}>back</Link>}
        </div>
      </div>     
      <div className={styles.catalog}>
      {catalog.catalogItems.map((item) => (
        <ItemCard key={item.id} catalogItem={item}/>
      ))}
      </div>
    </>
}

export async function getServerSideProps({params, query}) {     
  const username =  query.username ? query.username : null
  const res = await fetch(`http://localhost/favolog.service/api/catalog/${params.id}`)
  
  const catalog = await res.json()
  return {
    props: {
      catalog,
      username
    }
  }
}

