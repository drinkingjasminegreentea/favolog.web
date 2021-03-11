import styles from '../styles/CatalogStyles.module.css'
import Image from 'next/image'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import AddComment from './AddComment'
import { useState } from 'react'
import ProfileIcon from './ProfileIcon'
import Link from 'next/link'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

export default function ItemCard({
  item,
  catalogId,
  user,
  isEditable,
  removeItemFromCatalog,
}) {
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showEditItem, setShowEditItem] = useState(false)
  const [showAddComment, setShowAddComment] = useState(false)
  const [itemState, setItemState] = useState(item)

  const removeItem = (data) => {
    if (data) {
      removeItemFromCatalog(data)
    }
    setShowDeleteItem(!showDeleteItem)
  }

  const updateItem = (data) => {
    if (data) {
      const copy = { ...itemState, ...data }
      setItemState(copy)
    }
    setShowEditItem(!showEditItem)
  }

  const addComment = (data) => {
    if (data) {
      const copy = { ...itemState, ...data }
      setItemState(copy)
    }
    setShowAddComment(!showAddComment)
  }

  return (
    <div className={styles.catalogItem}>
      {isEditable && (
        <span className={styles.itemEditIcons}>
          <img
            src='/icons/pencil.svg'
            className='button'
            onClick={() => setShowEditItem(!showEditItem)}
          />
          <img
            src='/icons/x.svg'
            className='button'
            onClick={() => setShowDeleteItem(!showDeleteItem)}
          />
        </span>
      )}
      <a href={itemState.url} target='_blank'>
        <span> {itemState.title} </span>
      </a>
      <div className={styles.cardImage}>
        {itemState.imageName ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${itemState.imageName}`}
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
      {item.comment ? (
        <div className={styles.comment}>
          <ProfileIcon
            profileImage={user.profileImage}
            firstName={user.firstName}
          />
          <div>
            <span>{user.firstName} </span>
            {user.LastName && <span>{user.LastName}</span>} <br />
            <Accordion>
              <span>{item.comment.substring(0, 25)} ..</span>
              <Accordion.Toggle as='a' variant='link' eventKey='0'>
                <img className='button' src='/icons/expand_more-24px.svg' />
              </Accordion.Toggle>
              <Accordion.Collapse eventKey='0'>
                <span>Hello! I'm the body</span>
              </Accordion.Collapse>
            </Accordion>
          </div>
        </div>
      ) : (
        <div
          className={styles.comment + ' button'}
          onClick={() => setShowAddComment(!showAddComment)}
        >
          <img
            src='/icons/chat_bubble_outline-24px.svg'
            width='20'
            height='20'
          />
          <span> Comment </span>
        </div>
      )}
      <DeleteItem
        show={showDeleteItem}
        parentAction={removeItem}
        catalogId={catalogId}
        itemId={itemState.id}
      />
      <EditItem
        show={showEditItem}
        parentAction={updateItem}
        item={itemState}
      />
      <AddComment
        show={showAddComment}
        parentAction={addComment}
        item={itemState}
      />
    </div>
  )
}
