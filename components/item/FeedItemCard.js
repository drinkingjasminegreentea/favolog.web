import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '../user/ProfileImage'
import Follow from '@/components/layout/Follow'
import styles from '../../styles/Feed.module.css'

export default function FeedItemCard({ item, showFollow }) {
  const user = {
    id: item.userId,
    profileImage: item.profileImage,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
  }

  return (
    <div className='card'>
      <a href={item.url} target='_blank' className='grid'>
        <div className={styles.text}>
          <h5>{item.title}</h5>
          <span>
            <Image src='/icons/box-arrow-up-right.svg' width='10' height='10' />
            {item.urlDomain}
          </span>
        </div>
        {item.imageName && (
          <div className='center'>
            <Image
              src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`}
              layout='fixed'
              objectFit='contain'
              width='300'
              height='150'
              quality={100}
            />
          </div>
        )}
      </a>

      <div className={styles.header}>
        <Link href={`/${user.username}`}>
          <div className='button'>
            <ProfileImage
              profileImage={user.profileImage}
              username={user.username}
              width='35'
              height='35'
            />
          </div>
        </Link>
        <span>
          <Link href={`/${user.username}`}>
            <b className='button'>{user.username}</b>
          </Link>
          <b>{' > '}</b>
          <Link href={`/catalog/${item.catalogId}`}>
            <b className='button'>{item.catalogName}</b>
          </Link>
        </span>
        {showFollow && <Follow />}
      </div>
      <div className={styles.comment}>{item.comment}</div>
    </div>
  )
}
