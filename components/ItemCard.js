import styles from '../styles/CatalogItem.module.css'
import Image from 'next/image'

export default function ItemCard({item}){
    
    return (        
        <div className={styles.catalogItem}>            
            <span> {item.title} </span>            
            <Image
                src={`https://favostorage.blob.core.windows.net/productimages/${item.imageName}`}
                layout="intrinsic"
                objectFit = "contain"
                width="150"
                height="150"
                quality={100}                        
            />
            <a href={item.url} target="_blank" > Link </a>            
        </div> 
    )
  }
  
  
  