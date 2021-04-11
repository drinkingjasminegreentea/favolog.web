import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function ItemCard({ item, username }) {
  let link = `/item/${item.id}`
  if (username) link += `?username=${username}`
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
  return (
    <Link href={link}>
      <div className={styles.catalogItem + ' button'}>
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
        {item.title}
      </div>
    </Link>
  )
}
