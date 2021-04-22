import styles from '@/styles/ItemsGrid.module.css'
import Image from 'next/image'

export default function ItemsGrid({ items }) {
  const imageFolder = `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`

  return (
    <div className={styles.items}>
      {items.map((item) => (
        <div key={item.id} className={styles.item}>
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
      ))}
    </div>
  )
}
