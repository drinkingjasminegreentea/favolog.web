import styles from '../../styles/CatalogStyles.module.css'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import AddComment from './AddComment'
import Comment from './Comment'
import { useState } from 'react'
import ItemImage from './ItemImage'

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
        <span className='bold'> {itemState.title} </span>
      </a>
      <div className={styles.cardImage}>
        <ItemImage imageName={item.imageName} />
      </div>
      {item.comment && <Comment item={item} user={user} />}
      {!item.comment && isEditable && (
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
