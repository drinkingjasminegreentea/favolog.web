import Image from 'next/image'
import styles from '../../styles/CatalogStyles.module.css'

export default function ItemImage({ imageName }) {
  return (
    <div className='center'>
      {imageName ? (
        <Image
          src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${imageName}`}
          layout='fixed'
          objectFit='contain'
          width='200'
          height='200'
          quality={100}
        />
      ) : (
        <div className={styles.emptyCatalog}>
          <img src='/icons/file-image.svg' width='50' height='50' />
        </div>
      )}
    </div>
  )
}
