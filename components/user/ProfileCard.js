import ProfileImage from './ProfileImage'
import Link from 'next/link'
import styles from '../../styles/ProfileInfo.module.css'

export default function ProfileCard({ user }) {
  return (
    <Link href={`/${user.username}`}>
      <div className={styles.userCard + ' button'}>
        <ProfileImage
          profileImage={user.profileImage}
          username={user.username}
          width='100'
          height='100'
        />
        <div className={styles.userInfo}>
          <h5>{user.username}</h5>
          <span> {user.bio} </span>
        </div>
      </div>
    </Link>
  )
}
