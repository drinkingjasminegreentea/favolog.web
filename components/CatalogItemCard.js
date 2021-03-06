import styles from '../styles/CatalogStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import DeleteCatalogItem from './DeleteCatalogItem'
import {useState} from 'react'

export default function CatalogItemCard({item, catalogId, isEditable}){       
    const [showDeleteItem, setShowDeleteItem] = useState(false)

    function toggleDeleteItem(){
      setShowDeleteItem(!showDeleteItem)
    }
    
    return (<div className={styles.catalogItem + " button"}>            
            <Link href={`/item/${item.id}?catalogId=${catalogId}`}><div>
                <span> {item.title} </span>            
                <Image
                    src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
                    layout="fixed"
                    objectFit = "contain"
                    width="200"
                    height="200"
                    quality={100}    
                    className="button"
                />
            </div></Link>                    
            {isEditable && <img src='/icons/x.svg' className={"button " + styles.deleteItem} onClick={toggleDeleteItem}/>}
            <DeleteCatalogItem show={showDeleteItem} parentAction={toggleDeleteItem} catalogId={catalogId} itemId={item.id}/>   
        </div>
    )
  }
  
  
  