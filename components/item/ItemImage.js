import Image from 'next/Image'
import styles from '../../styles/CatalogStyles.module.css'

export default function ItemImage({ imageName }) {
  return imageName ? (
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
      <img src='/icons/list.svg' width='50' height='50' />
    </div>
  )
}
