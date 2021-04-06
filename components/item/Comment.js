import ProfileIcon from '../user/ProfileIcon'
import styles from '../../styles/CatalogStyles.module.css'
import Link from 'next/link'

export default function Comment({ item, user, toggleItemView }) {
  const textLimit = 50

  return (
    <div className={styles.comment}>
      <Link href={`/${user.username}`}>
        <a className='button'>
          <ProfileIcon
            profileImage={user.profileImage}
            username={user.username}
          />
        </a>
      </Link>
      <div>
        <Link href={`/${user.username}`}>
          <h6 className='button '>{user.username}</h6>
        </Link>
        {item.comment && item.comment.length > textLimit && (
          <>
            <span>{item.comment.substring(0, textLimit)}... </span>
            <span className='button text-muted' onClick={toggleItemView}>
              more
            </span>
          </>
        )}
        {item.comment && item.comment.length <= textLimit && (
          <span>{item.comment} </span>
        )}
      </div>
    </div>
  )
}
