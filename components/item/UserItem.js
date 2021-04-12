import styles from '../../styles/CatalogStyles.module.css'
import Image from 'next/image'
import ItemView from './ItemView'
import { useState } from 'react'

export default function ItemCard({ item, user }) {
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
  const [showItemView, setShowItemView] = useState(false)

  const toggleItemView = () => {
    setShowItemView(!showItemView)
  }

  return (
    <div className={styles.catalogItem + ' button'} onClick={toggleItemView}>
      {item.title}
      {item.imageName && (
        <div className={styles.catalogImages}>
          <Image
            src={`${imageFolder}/${item.imageName}`}
            className={styles.catalogFirstImage}
            layout='fixed'
            objectFit='contain'
            width='130'
            height='150'
            quality={100}
          />
        </div>
      )}
      <ItemView
        show={showItemView}
        parentAction={toggleItemView}
        item={item}
        user={user}
      />
    </div>
  )
}
