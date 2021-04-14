import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditItem from './EditItem'
import DeleteItem from './DeleteItem'
import { useState } from 'react'
import styles from '../../styles/CatalogStyles.module.css'

export default function ItemMenu({ item }) {
  const [showDeleteItem, setShowDeleteItem] = useState(false)
  const [showEditItem, setShowEditItem] = useState(false)

  return (
    <span className={styles.addEdit}>
      <Dropdown>
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

      <EditItem
        show={showEditItem}
        parentAction={() => setShowEditItem(!showEditItem)}
        item={item}
      />
      <DeleteItem
        show={showDeleteItem}
        parentAction={() => setShowDeleteItem(!showDeleteItem)}
        item={item}
      />
    </span>
  )
}
