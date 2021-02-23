import styles from '../styles/CatalogItem.module.css'

export default function ItemCard({item}){
       
    return (        
        <div className={styles.catalogItem}>            
            <span> {item.url} </span>            
        </div> 
    )
  }
  
  
  