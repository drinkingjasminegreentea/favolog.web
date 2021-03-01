import styles from '../styles/CatalogStyles.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function FeedItemCard({item}){      
    return (        
        <div className={styles.catalogItem}>                                                                  
            <Link href={`/item/${item.itemId}`}><div><span className={commonStyles.button}> {item.title} </span>            
            <Image
                src={`https://favostorage.blob.core.windows.net/productimages/${item.imageName}`}
                layout="intrinsic"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}
                className={commonStyles.button}               
            /></div></Link>                              
            <Link href={`catalog/${item.catalogId}`}><h5 className={commonStyles.button}> {item.catalogName} </h5></Link>
            <Link href={`user/${item.username}`}><div className={commonStyles.button + " " + styles.catalogAuthorGrid}> 
            <span>
            {item.profileImage ? <Image
                  src={`https://favostorage.blob.core.windows.net/profileimages/${item.profileImage}`}
                  layout="fixed"
                  objectFit = "cover"
                  objectPosition = "top"
                  width="30"
                  height="30"
                  quality={100}  
                  className={styles.authorProfile}                      
              />
          : <div className={styles.authorPlaceholder}><b> {item.username.substring(0, 1).toUpperCase()} </b> </div> } </span>
          <span> {item.username} </span>
            </div></Link>
            <Link href={`/item/${item.id}`}><span className={commonStyles.button}> {item.comments}</span></Link>            
        </div>
    )
  }
  
  
  