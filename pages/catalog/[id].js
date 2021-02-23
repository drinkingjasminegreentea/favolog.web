import styles from '../../styles/CommonStyles.module.css'
import ProductItem from '../../components/ProductItem'
import Link from 'next/link'

export default function Catalog({ catalog }) {
    return <>  
    <div className={styles.catalogHeader}>
      <h1> {catalog.name} </h1>
      <Link href={`/product/add/${catalog.id}`}><img className={styles.button}
       src='/icons/add.png'/></Link>
      <img src='/icons/edit.png' className={styles.button}/>
      </div>     
      <div className={styles.catalog}>
      {catalog.userProducts.map((userProduct) => (
        <ProductItem key={userProduct.id} product={userProduct.product}/>
      ))}
      </div>
    </>
  }
  
  export async function getServerSideProps({params}) {     
    const res = await fetch(`http://localhost/favolog.service/api/catalog/${params.id}`)
    
    const catalog = await res.json()
    
    return {
      props: {
        catalog
      }
    }
  }

  