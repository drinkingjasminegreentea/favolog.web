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
                src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${catalog.lastItemImage}`}
                layout="fixed"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}                        
            /> }
        </div></Link> 
    )
  }
  
    