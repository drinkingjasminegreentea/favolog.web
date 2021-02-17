import { useRouter } from 'next/router'
import styles from '../styles/CatalogItem.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const CatalogItem = ({catalog}) => {
    const router = useRouter()

    const collapseOpen = (e) =>  {
        if (catalog.topProducts.length === 0) 
            return;
        
        var productCard = e.target.parentElement.nextElementSibling;
        var src = e.target.src;
        if (src.includes('arrowUp')){        
            e.target.src = '../icons/arrowDown.png';
            productCard.style.display = "none";
            productCard.parentElement.style.gridRow = "auto";
        }
        else{
            e.target.src = '../icons/arrowUp.png';
            productCard.style.display = "grid";
            productCard.parentElement.style.gridRow = "auto / span 5";
        }    
    }
    
    return (        
        <div className={styles.catalogItem}>
            <div className={styles.catalogCard}>
                <h2> {catalog.name} </h2>        
                <img src={'../icons/edit.png'}></img>
                <img className={commonStyles.button} 
                    src={'../icons/add.png'}
                    onClick={() => router.push(`/product/add/${catalog.id}`)}></img>
                {
                    catalog.topProducts.length > 0 &&  
                    <img src={'../icons/arrowDown.png'} onClick={collapseOpen}></img>              
                }     
                {
                    catalog.topProducts.length > 0 &&  
                    <span> {catalog.productTotalCount} items </span> 
                }                    
            </div>
            <div className={styles.productsCard}>
                {catalog.topProducts.length > 0 && catalog.topProducts.map((product) => (
                    <div key={product.id} className={styles.product}>           
                    <img src={'../images/shampoo.jfif'}></img>            
                        <div>
                            <h4>{product.name}</h4>
                            <span>{product.brand}</span>
                        </div>                                       
                    </div>
                ))}
            </div>                     
        </div> 
    )
  }
  
  export default CatalogItem
  