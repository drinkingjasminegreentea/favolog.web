import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function CatalogCard({ catalog, username }) {
  let catalogLink = `/catalog/${catalog.id}`
  if (username) catalogLink += `?username=${username}`
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
  return (
    <Link href={catalogLink}>
      <div className={styles.catalogItem + ' button card'}>
        {catalog.lastThreeImages.length > 1 && (
          <div className={styles.catalogImages}>
            <Image
              src={`${imageFolder}/${catalog.lastThreeImages[0]}`}
              className={styles.catalogFirstImage}
              layout='fixed'
              objectFit='contain'
              width='130'
              height='150'
              quality={100}
            />
            <div>
              <Image
                src={`${imageFolder}/${catalog.lastThreeImages[1]}`}
                layout='fixed'
                objectFit='contain'
                width='90'
                height='100'
                quality={100}
              />
              <Image
                src={`${imageFolder}/${catalog.lastThreeImages[2]}`}
                layout='fixed'
                objectFit='contain'
                width='90'
                height='100'
                quality={100}
              />
            </div>
          </div>
        )}
        <h5> {catalog.name} </h5>
        <span> {catalog.itemCount} items </span>
      </div>
    </Link>
  )
}
