import styles from '../styles/CatalogItem.module.css'
import Image from 'next/image'

export default function ItemCard({item}){
       
    return (        
        <div className={styles.catalogItem}>            
            <span> {item.title} </span>            
            <span> {item.url} </span>     
            <img
                src={item.imageUrl}
            />       
        </div> 
    )
  }
  
  
  