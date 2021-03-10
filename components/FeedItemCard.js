import styles from '../styles/CatalogStyles.module.css'
import commonStyles from '../styles/CommonStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function FeedItemCard({ item }) {
  return (
    <div className={styles.catalogItem}>
      <Link href={`/item/${item.itemId}`}>
        <span className={commonStyles.button}> {item.title} </span>
      </Link>
      <Link href={`/item/${item.itemId}`}>
        <div className={styles.cardImage}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='200'
            height='200'
            quality={100}
            className={commonStyles.button}
          />
        </div>
      </Link>
      <Link href={`catalog/${item.catalogId}`}>
        <h5 className={commonStyles.button}> {item.catalogName} </h5>
      </Link>
      <Link href={`user/${item.userId}`}>
        <div className={commonStyles.button + ' ' + styles.catalogAuthorGrid}>
          {item.profileImage ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${item.profileImage}`}
              layout='fixed'
              objectFit='cover'
              objectPosition='top'
              width='30'
              height='30'
              quality={100}
              className={styles.authorProfile}
            />
          ) : (
            <div className={styles.authorPlaceholder}>
              <b> {item.firstName.substring(0, 1).toUpperCase()} </b>{' '}
            </div>
          )}
          <span> &nbsp; {item.firstName} </span>{' '}
          {item.LastName && <span>{item.LastName}</span>}
        </div>
      </Link>
      <Link href={`/item/${item.id}`}>
        <span className={commonStyles.button}> {item.comments}</span>
      </Link>
    </div>
  )
}
