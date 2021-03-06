import styles from '../../styles/CatalogStyles.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import CatalogItemCard from '../../components/CatalogItemCard'
import AddItem from '../../components/AddItem'
import EditCatalog from '../../components/EditCatalog'
import DeleteCatalog from '../../components/DeleteCatalog'
import {useState, useContext, useEffect} from 'react'
import {UserContext} from '../../src/UserContext'
import Link from 'next/link'
import Image from 'next/image'

const CatalogEdit = ({catalog}) => {
    const [showAddItem, setShowAddItem] = useState(false)
    const [showEditCatalog, setShowEditCatalog] = useState(false)
    const [showDeleteCatalog, setShowDeleteCatalog] = useState(false)

    function toggleAddItem(){
      setShowAddItem(!showAddItem)
    }

    function toggleEditCatalog(){
      setShowEditCatalog(!showEditCatalog)
    }

    function toggleDeleteCatalog(){
      setShowDeleteCatalog(!showDeleteCatalog)
    }

  return <span className={styles.addEdit}>    
    <img src='/icons/plus-circle.svg' className={commonStyles.button} onClick={toggleAddItem}/>
    <img src='/icons/pencil-fill.svg' className={commonStyles.button} onClick={toggleEditCatalog}/>
    <img src='/icons/trash.svg' className={commonStyles.button} onClick={toggleDeleteCatalog}/>
    <AddItem show={showAddItem} parentAction={toggleAddItem} catalogId={catalog.id}/> 
    <EditCatalog show={showEditCatalog} parentAction={toggleEditCatalog} catalog={catalog}/>
    <DeleteCatalog show={showDeleteCatalog} parentAction={toggleDeleteCatalog} catalogId={catalog.id}/></span>
}

const ProfileImage = ({user}) =>{
  if (user.profileImage){
    return <Image
      src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${user.profileImage}`}
      layout="fixed"
      objectFit = "cover"
      objectPosition = "top"
      width="30"
      height="30"
      quality={100}  
      className={styles.authorProfile}                      
  />
  }
  else{
    return <div className={styles.authorPlaceholder}><b> {user.username.substring(0, 1).toUpperCase()} </b> </div>
  }
}

export default function Page({ catalog }) {
    const { user } = useContext(UserContext)            
    const [isEditable, setIsEditable] = useState(false)        
    const author = catalog.user   
    
    useEffect(()=>{
      if (user){
        setIsEditable(user.id === catalog.userId)                
      }      
    }, [user])    
    
    return <>  
    <div className={styles.catalogHeader}>
      <h4> {catalog.name} </h4>
      {isEditable ?  <CatalogEdit catalog={catalog}/> : <Link href={`/user/${author.username}`}>
              <div className={styles.catalogAuthor + " " + commonStyles.button}>
                <ProfileImage user={author}/>
              <span> {author.username}</span>
            </div></Link>}
        </div> 
      <div className={styles.catalog}>
      {catalog.items.map((item) => (
        <CatalogItemCard key={item.id} item={item} catalogId={catalog.id} isEditable={isEditable}/>
      ))}
      </div>
    </>
}

export async function getServerSideProps({params}) {       
  const res = await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${params.id}`)
  
  const catalog = await res.json()
  return {
    props: {
      catalog
    }
  }
}

