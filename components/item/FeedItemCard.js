import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '../user/ProfileImage'
import styles from '../../styles/Feed.module.css'

const LinkView = function ({ item }) {
  return (
    <>
      <div className={styles.text}>
        <h4>{item.title}</h4>
        <span className='link'>
          <Image src='/icons/box-arrow-up-right.svg' width='10' height='10' />
          {item.urlDomain}
        </span>
      </div>
      {item.imageName && (
        <a href={item.url} target='_blank' className={styles.linkImage}>
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
            layout='fixed'
            objectFit='contain'
            width='400'
            height='300'
            quality={100}
          />
        </a>
      )}
    </>
  )
}

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
      <Link href={`/catalog/${item.catalogId}`}>
        <h5 className='button bold'>{item.catalogName}</h5>
      </Link>
      <LinkView item={item} />
      <div className={styles.header}>
        <span className='button'>
          <ProfileImage
            profileImage={user.profileImage}
            username={user.username}
            width='35'
            height='35'
          />
        </span>
        <span className={styles.catalogBreadCrumb}>
          <Link href={`/${user.username}`}>
            <span className='button'>{user.username}</span>
          </Link>
        </span>
        <button className='secondary'>Follow</button>
      </div>
      <div className={styles.comment}>{item.comment}</div>
    </div>
  )
}
