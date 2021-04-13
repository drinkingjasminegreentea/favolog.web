import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function CatalogCard({ catalog, username }) {
  let catalogLink = `/catalog/${catalog.id}`
  if (username) catalogLink += `?username=${username}`
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
  return (
    <Link href={catalogLink}>
      <div className={styles.catalogItem + ' button'}>
        <b> {catalog.name} </b>
        <br />
        <span> {catalog.itemCount} items </span>
        <br />
        <br />
        {catalog.lastImage && (
          <div className='center'>
            <Image
              src={`${imageFolder}/${catalog.lastThreeImages[0]}`}
              className={styles.catalogFirstImage}
              layout='fixed'
              objectFit='contain'
              width='130'
              height='150'
              quality={100}
            />
          </div>
        )}
      </div>
    </Link>
  )
}
