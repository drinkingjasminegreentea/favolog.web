import styles from '@/styles/CatalogsGrid.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function CatalogsGrid({ catalogs }) {
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`

  return (
    <div className={styles.catalogs}>
      {catalogs.map((catalog) => (
        <Link key={catalog.id} href={`/catalog/${catalog.id}`}>
          <div className={styles.catalog + ' button'}>
            <b> {catalog.name} </b>
            <span> {catalog.itemCount} items </span>
            {catalog.lastItemImage && (
              <div className='center'>
                <Image
                  src={`${imageFolder}/${catalog.lastItemImage}`}
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
      ))}
    </div>
  )
}
