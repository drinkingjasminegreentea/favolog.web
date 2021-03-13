import ProfileIcon from '../user/ProfileIcon'
import { useState } from 'react'
import styles from '../../styles/CatalogStyles.module.css'
import ItemView from './ItemView'
import Link from 'next/link'

export default function Comment({ item, user }) {
  const [showItemView, setShowItemView] = useState(false)
  const textLimit = 20

  if (item.userId) {
    user = {
      id: item.userId,
      profileImage: item.profileImage,
      username: item.username,
      firstName: item.firstName,
      lastName: item.lastName,
    }
  }

  return (
    <div className={styles.comment}>
      <ProfileIcon profileImage={user.profileImage} username={user.username} />
      <div>
        <Link href={`/user/${user.id}`}>
          <span className='link bold'>{user.username}</span>
        </Link>
        <br />
        {item.comment && item.comment.length > textLimit && (
          <div
            className='button'
            onClick={() => setShowItemView(!showItemView)}
          >
            <span>{item.comment.substring(0, textLimit)} ..</span>
            <img src='/icons/expand_more-24px.svg' />
          </div>
        )}
        {item.comment && item.comment.length <= textLimit && (
          <span>{item.comment} </span>
        )}
      </div>
      <ItemView
        show={showItemView}
        parentAction={() => setShowItemView(!showItemView)}
        item={item}
        user={user}
      />
    </div>
  )
}
