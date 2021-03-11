import styles from '../styles/CatalogStyles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import ProfileIcon from './ProfileIcon'

export default function FeedItemCard({ item }) {
  return (
    <div className={styles.catalogItem}>
      <a href={item.url} target='_blank'>
        <span>{item.title}</span>
      </a>
      <div className={styles.cardImage}>
        {item.imageName ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
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

      <Link href={`catalog/${item.catalogId}`}>
        <h5 className='button'> {item.catalogName} </h5>
      </Link>
      <div className={'button ' + styles.comment}>
        <ProfileIcon
          profileImage={item.profileImage}
          firstName={item.firstName}
        />
        <div>
          <span> {item.firstName} </span>
          {item.LastName && <span>{item.LastName}</span>} <br />
          {item.comment && (
            <span>
              {item.comment.substring(0, 25)} ..
              <img className='button' src='/icons/expand_more-24px.svg' />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
