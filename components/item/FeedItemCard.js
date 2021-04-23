import Image from 'next/image'
import Link from 'next/link'
import ProfileImage from '../user/ProfileImage'
import Follow from '@/components/layout/Follow'
import styles from '@/styles/Feed.module.css'

const Comment = ({ comment }) => {
  const limit = 200

  if (comment.length < limit + 1) return comment

  return `${comment.substring(0, limit)}..`
}

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
      <div className='grid'>
        <div className={styles.header}>
          <ProfileImage
            profileImage={user.profileImage}
            username={user.username}
            width='35'
            height='35'
          />
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
        <Link href={`/item/${item.id}`}>
          <div className='button grid'>
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
            <h5>{item.title}</h5>
            {item.comment && <Comment comment={item.comment} />}
          </div>
        </Link>
      </div>
    </div>
  )
}
