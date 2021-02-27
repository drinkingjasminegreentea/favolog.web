import styles from '../styles/CatalogStyles.module.css'
import Image from 'next/image'

export default function ItemCard({catalogItem}){
    const item = catalogItem.item
    return (        
        <div className={styles.catalogItem}>                                    
            <span> {item.title} </span>                     
            <Image
                src={`https://favostorage.blob.core.windows.net/productimages/${item.imageName}`}
                layout="intrinsic"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}                        
            />            
            <span> {catalogItem.comments}</span>
            <a href={item.url} target="_blank" > <Image src='/icons/globe.svg' width="20" height="20"></Image> </a>
        </div> 
    )
  }
  
  
  