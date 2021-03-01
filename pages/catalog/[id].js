import styles from '../../styles/CatalogStyles.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import CatalogItemCard from '../../components/CatalogItemCard'
import AddItem from '../../components/AddItem'
import {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../src/UserContext'
import Link from 'next/link'
import Image from 'next/image'

export default function Page({ catalog }) {
    const { user } = useContext(UserContext)            
    const [isEditable, setIsEditable] = useState(false)    
    const [showModal, setShowModal] = useState(false) 
    const author = catalog.user   
    
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
      <h4> {catalog.name} </h4>
      <div className={styles.catalogMenu}>
        {isEditable &&  <span className={styles.addEdit}>
          <img className={commonStyles.button} onClick={toggleModalWindow} src='/icons/add.png'/>
          <img src='/icons/edit.png' className={commonStyles.button}/>
          <AddItem show={showModal} parentAction={(toggleModalWindow)} catalogId={catalog.id}/> </span>}
          <Link href={`/user/${author.username}`}>
            <div className={styles.catalogAuthor + " " + commonStyles.button}>
            {author.profileImage ? <Image
                  src={`https://favostorage.blob.core.windows.net/profileimages/${author.profileImage}`}
                  layout="fixed"
                  objectFit = "cover"
                  objectPosition = "top"
                  width="30"
                  height="30"
                  quality={100}  
                  className={styles.authorProfile}                      
              />
          : <div className={styles.authorPlaceholder}><b> {author.username.substring(0, 1).toUpperCase()} </b> </div> }
          <span>{author.username}</span>
          </div></Link>
        </div>
      </div> 
      <div className={styles.catalog}>
      {catalog.items.map((item) => (
        <CatalogItemCard key={item.id} item={item} catalogId={catalog.id}/>
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

