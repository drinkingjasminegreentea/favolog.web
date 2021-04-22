import styles from '@/styles/ItemsGrid.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function ItemsGrid({ items }) {
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`

  return (
    <div className={styles.items}>
      {items.map((item) => (
        <Link key={item.id} href={`/item/${item.id}`}>
          <div className={styles.item + ' button'}>
            <b>{item.title}</b>
            <div className='center'>
              {item.imageName && (
                <Image
                  src={`${imageFolder}/${item.imageName}`}
                  className={styles.catalogFirstImage}
                  layout='fixed'
                  objectFit='contain'
                  width='130'
                  height='150'
                  quality={100}
                />
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
