import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'
import ItemImage from '../item/ItemImage'

export default function CatalogCard({ catalog, username }) {
  let catalogLink = `/catalog/${catalog.id}`
  if (username) catalogLink += `?username=${username}`
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
  return (
    <Link href={catalogLink}>
      <div className={styles.catalogItem + ' button'}>
        {catalog.lastThreeImages.length > 1 ? (
          <div className={styles.catalogImages}>
            <Image
              src={`${imageFolder}/${catalog.lastThreeImages[0]}`}
              className={styles.catalogFirstImage}
              layout='fixed'
              objectFit='contain'
              width='150'
              height='200'
              quality={100}
            />
            <div>
              <Image
                src={`${imageFolder}/${catalog.lastThreeImages[1]}`}
                layout='fixed'
                objectFit='contain'
                width='100'
                height='100'
                quality={100}
              />
              <Image
                src={`${imageFolder}/${catalog.lastThreeImages[2]}`}
                layout='fixed'
                objectFit='contain'
                width='100'
                height='100'
                quality={100}
              />
            </div>
          </div>
        ) : (
          <ItemImage imageName={catalog.lastThreeImages[0]} />
        )}
        <h4> {catalog.name} </h4>
        <span> {catalog.itemCount} items </span>
      </div>
    </Link>
  )
}
