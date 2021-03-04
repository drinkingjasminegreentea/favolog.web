import styles from '../styles/CatalogStyles.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function CatalogItemCard({item, catalogId}){   
        
    return (        
        <Link href={`/item/${item.id}?catalogId=${catalogId}`}><div className={styles.catalogItem + " " + commonStyles.button}>                                    
            <span> {item.title} </span>                     
            <Image
                src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
                layout="fixed"
                objectFit = "contain"
                width="200"
                height="200"
                quality={100}    
                className={commonStyles.button}                    
            />            
        </div></Link>
    )
  }
  
  
  