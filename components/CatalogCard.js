import commonStyles from '../styles/CommonStyles.module.css'
import styles from '../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function CatalogCard({catalog}){
       
    return (        
        <div className={styles.catalogItem}>
            <div>
                <Link href={`/catalog/${catalog.id}`}><h2 className={commonStyles.button}> {catalog.name} </h2></Link>
                <span> {catalog.itemCount} items </span>
            </div>            
            {catalog.lastItemImage && <Image
                src={`https://favostorage.blob.core.windows.net/productimages/${catalog.lastItemImage}`}
                layout="intrinsic"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}                        
            /> }
        </div> 
    )
  }
  
    