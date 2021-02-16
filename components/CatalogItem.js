import styles from '../styles/CatalogItem.module.css'

const CatalogItem = () => {
    return (        
        <div className={styles.catalogItem}>
            <div className={styles.catalogCard}>
                <h2> Tech gifts 2020 </h2>        
                <img src={'../icons/edit.png'}></img>
                <img src={'../icons/add.png'}></img>
                <img src={'../icons/arrowDropDown.png'}></img>
                <span> 17 items </span> 
            </div>            
            <div className={styles.productsCard}>
                <div className={styles.product}>                    
                    <div>
                        <h4>Lipstick</h4>
                        <span>Mac</span>                    
                    </div>                                       
                </div>
                <div className={styles.product}>                    
                    <div>
                        <h4>Shirt</h4>
                        <span>Athleta</span>                    
                    </div>                                       
                </div>
                <div className={styles.product}>                    
                    <div>
                        <h4>Leggins</h4>
                        <span>Lululemon</span>                    
                    </div>                                       
                </div>
            </div>                     
        </div>         
        
    )
  }
  
  export default CatalogItem
  