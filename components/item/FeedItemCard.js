import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '../user/ProfileImage'
import styles from '../../styles/Feed.module.css'

export default function FeedItemCard({ item }) {
  const user = {
    id: item.userId,
    profileImage: item.profileImage,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
  }

  return (
    <div className='card'>
      <div className={styles.header}>
        <ProfileImage
          profileImage={user.profileImage}
          username={user.username}
          width='35'
          height='35'
        />
        <span className={styles.catalogBreadCrumb}>
          <Link href={`/${user.username}`}>
            <span className='button'>{user.username}</span>
          </Link>
          {' > '}
          <Link href={`/catalog/${item.catalogId}`}>
            <span className='button'>{item.catalogName}</span>
          </Link>
        </span>
        <button className={styles.secondary}>Follow</button>
      </div>
      {item.imageName && (
        <div className={styles.image}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='400'
            height='400'
            quality={100}
          />
        </div>
      )}
      <div className={styles.footer}>
        <span className={styles.feedAuthor}>
          <h5>{item.title}</h5>
          <a href={item.url} className='link'>
            {item.urlDomain}
          </a>
        </span>
        <br />
        <div>{item.comment}</div>
      </div>
    </div>
  )
}
