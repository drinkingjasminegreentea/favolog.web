import styles from '../../styles/CatalogStyles.module.css'
import commonStyles from '../../styles/CommonStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Page({ item, catalogId }) {       
    return <div className={styles.itemPage}>
      <span>
      {catalogId && <Link href={`/catalog/${catalogId}`}><span className={commonStyles.button + " " + styles.rightAlign}> Back to catalog </span></Link>}
      </span> 
      <h4>{item.title}</h4>
      <div className={styles.itemDetails}>                             
        <h5>Catalogs</h5>
        {item.catalogs.map((catalog) => (
        <Link key={catalog.id} href={`/catalog/${catalog.id}`}><span className={commonStyles.button}> {catalog.name}</span></Link>
          ))}       
        <h5>Source</h5> 
        <a href={item.url} target="_blank" > {item.urlDomain} </a>
        <h5>Comments</h5>   
        {item.catalogItems.map((item) => (
        <span key={item.id}> {item.comments}</span>
          ))}
      </div>
      <Image
          src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
          layout="intrinsic"
          objectFit = "contain"
          width="300"
          height="300"
          quality={100}                        
      />      
      </div>      
}

export async function getServerSideProps({params, query}) {       
  const res = await fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item/${params.id}`)  
  const item = await res.json()
  const catalogId = query.catalogId || null

  return {
    props: {
      item,
      catalogId
    }
  }
}

