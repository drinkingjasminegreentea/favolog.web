import Dropdown from 'react-bootstrap/Dropdown'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditCatalog from './EditCatalog'
import DeleteCatalog from './DeleteCatalog'
import { useState } from 'react'
import styles from '../../styles/CatalogStyles.module.css'

export default function CatalogMenu({ catalog }) {
  const [showEditCatalog, setShowEditCatalog] = useState(false)
  const [showDeleteCatalog, setShowDeleteCatalog] = useState(false)

  return (
    <span className={styles.addEdit}>
      <Dropdown drop='bottom'>
        <Dropdown.Toggle as='a' bsPrefix='custom' className='button'>
          <img src='/icons/more_horiz-24px.svg' />
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.dropDownMenu} align='right'>
          <Dropdown.Item onClick={() => setShowEditCatalog(!showEditCatalog)}>
            Edit catalog
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setShowDeleteCatalog(!showDeleteCatalog)}
          >
            Delete catalog
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <EditCatalog
        show={showEditCatalog}
        parentAction={() => setShowEditCatalog(!showEditCatalog)}
        catalog={catalog}
      />
      <DeleteCatalog
        show={showDeleteCatalog}
        parentAction={() => setShowDeleteCatalog(!showDeleteCatalog)}
        catalogId={catalog.id}
      />
    </span>
  )
}
