import styles from '../styles/CatalogItem.module.css'

const ProductItem = ({product}) => {
       
    return (        
        <div className={styles.catalogItem}>            
            <span> {product.name} </span>
            <span> {product.brand} </span>
        </div> 
    )
  }
  
  export default ProductItem
  