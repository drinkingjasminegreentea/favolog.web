import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/CatalogItem.module.css'
import commonStyles from '../styles/CommonStyles.module.css'

const CatalogItem = ({catalog}) => {
    const productImageRoot = "https://favostorage.blob.core.windows.net/productimages/";

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
                <img src={'../icons/edit.png'}/>
                <Link href={`/product/add/${catalog.id}`}>
                    <img className={commonStyles.button} src={'../icons/add.png'}/>
                </Link>
                {
                    catalog.topProducts.length > 0 &&  
                    <img src={'../icons/arrowDown.png'} onClick={collapseOpen}/>              
                }     
                {
                    catalog.topProducts.length > 0 &&  
                    <span> {catalog.productTotalCount} items </span> 
                }                    
            </div>
            <div className={styles.productsCard}>
                {catalog.topProducts.length > 0 && catalog.topProducts.map((userProduct) => (
                    <div key={userProduct.id} className={styles.product}>        
                    <Image
                        src={productImageRoot+userProduct.imageName}
                        layout="intrinsic"
                        objectFit = "contain"
                        width="150"
                        height="150"
                        quality={100}                        
                        />
                        <div className={styles.productInfo}>
                            <h4>{userProduct.product.name}</h4>
                            <span>{userProduct.product.brand}</span>
                        </div>                                       
                    </div>
                ))}
            </div>                     
        </div> 
    )
  }
  
  export default CatalogItem
  