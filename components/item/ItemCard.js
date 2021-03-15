import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/CatalogStyles.module.css'
import DeleteItem from './DeleteItem'
import EditItem from './EditItem'
import AddComment from './AddComment'
import Comment from './Comment'
import { useState } from 'react'
import ItemImage from './ItemImage'
import ItemView from './ItemView'

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
  const [showItemView, setShowItemView] = useState(false)

  const toggleItemView = () => {
    setShowItemView(!showItemView)
  }

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
          <Dropdown drop='bottom'>
            <Dropdown.Toggle as='a' bsPrefix='custom' className='button'>
              <img src='/icons/more_horiz-24px.svg' />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropDownMenu} align='right'>
              <Dropdown.Item onClick={() => setShowEditItem(!showEditItem)}>
                Edit item
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowDeleteItem(!showDeleteItem)}>
                Delete item
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </span>
      )}
      <span className='bold button' onClick={toggleItemView}>
        {itemState.title}
      </span>
      <div className={styles.cardImage + ' button'} onClick={toggleItemView}>
        <ItemImage imageName={itemState.imageName} />
      </div>
      {itemState.comment && (
        <Comment item={itemState} user={user} toggleItemView={toggleItemView} />
      )}
      {!itemState.comment && isEditable && (
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
      <ItemView
        show={showItemView}
        parentAction={toggleItemView}
        item={item}
        user={user}
      />
    </div>
  )
}
