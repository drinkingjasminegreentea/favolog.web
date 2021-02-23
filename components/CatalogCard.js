import styles from '../styles/CatalogItem.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import Link from 'next/link'

export default function CatalogCard({catalog}){
       
    return (        
        <div className={styles.catalogItem}>            
            <Link href={`/catalog/${catalog.id}`}><h1 className={commonStyles.button}> {catalog.name} </h1></Link>
            <span> {catalog.itemCount} items </span>
            <div className={styles.imageContainer}>
                Image here
            </div>
        </div> 
    )
  }
  
    