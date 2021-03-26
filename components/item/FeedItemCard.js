import ItemImage from './ItemImage'
import Comment from './Comment'
import Link from 'next/link'
import { useState } from 'react'
import ItemView from './ItemView'
import styles from '../../styles/CatalogStyles.module.css'

export default function FeedItemCard({ item }) {
  const [showItemView, setShowItemView] = useState(false)

  const toggleItemView = () => {
    setShowItemView(!showItemView)
  }

  const user = {
    id: item.userId,
    profileImage: item.profileImage,
    username: item.username,
    firstName: item.firstName,
    lastName: item.lastName,
  }

  return (
    <div className={styles.catalogItem}>
      <ItemImage imageName={item.imageName} clickHandler={toggleItemView} />
      <span className='button' onClick={toggleItemView}>
        {item.title}
      </span>
      <Link href={`catalog/${item.catalogId}`}>
        <h5 className='button'> {item.catalogName} </h5>
      </Link>
      <Comment item={item} user={user} toggleItemView={toggleItemView} />
      <ItemView
        show={showItemView}
        parentAction={toggleItemView}
        item={item}
        user={user}
      />
    </div>
  )
}
