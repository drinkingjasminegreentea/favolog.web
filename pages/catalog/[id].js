import styles from '../../styles/CommonStyles.module.css'
import ProductItem from '../../components/ProductItem'
import Link from 'next/link'

export default function Catalog({ catalog }) {
    return <>          
      <h1> {catalog.name} </h1>
      <Link href={`/product/add/${catalog.id}`}><button>Add product</button></Link>
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

  