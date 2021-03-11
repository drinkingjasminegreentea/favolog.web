import styles from '../../styles/ProfileInfo.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function UserCard({ user }) {
  return (
    <Link href={`/user/${user.id}`}>
      <div className={styles.userCard + ' button'}>
        {user.profileImage ? (
          <span>
            <Image
              src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_PROFILEIMAGESCONTAINER}/${user.profileImage}`}
              layout='fixed'
              objectFit='cover'
              objectPosition='top'
              width='100'
              height='100'
              quality={100}
            />
          </span>
        ) : (
          <div className={styles.profilePlaceholder}>
            <span>{user.firstName.substring(0, 1).toUpperCase()}</span>
          </div>
        )}
        <div className={styles.userInfo}>
          <span className='bold'>
            {user.firstName} {user.lastName}
          </span>
          <span> {user.bio} </span>
        </div>
      </div>
    </Link>
  )
}
