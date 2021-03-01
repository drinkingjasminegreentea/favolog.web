import commonStyles from '../styles/CommonStyles.module.css'
import styles from '../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function CatalogCard({catalog, username}){
    let catalogLink = `/catalog/${catalog.id}`
    if (username)
        catalogLink += `?username=${username}`
    
    return (        
        <Link href={catalogLink}><div className={styles.catalogItem + " " + commonStyles.button}>
            <h4> {catalog.name} </h4>
            <span> {catalog.itemCount} items </span>       
            {catalog.lastItemImage && <Image
                src={`https://favostorage.blob.core.windows.net/productimages/${catalog.lastItemImage}`}
                layout="intrinsic"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}                        
            /> }
        </div></Link> 
    )
  }
  
    