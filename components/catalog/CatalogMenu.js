import EditCatalog from './EditCatalog'
import DeleteCatalog from './DeleteCatalog'
import { useState } from 'react'
import styles from '../../styles/CatalogStyles.module.css'

export default function CatalogMenu({ catalog, setCatalog }) {
  const [showEditCatalog, setShowEditCatalog] = useState(false)
  const [showDeleteCatalog, setShowDeleteCatalog] = useState(false)

  function updateCatalog(update) {
    if (update) {
      const items = catalog.items
      const updatedCatalog = { ...catalog, ...update }
      updatedCatalog.items = items
      setCatalog(updatedCatalog)
    }
    setShowEditCatalog(false)
  }

  return (
    <span className={styles.addEdit}>
      <img
        src='/icons/pencil-fill.svg'
        className='button'
        onClick={() => setShowEditCatalog(!showEditCatalog)}
      />
      <img
        src='/icons/trash.svg'
        className='button'
        onClick={() => setShowDeleteCatalog(!showDeleteCatalog)}
      />
      <EditCatalog
        show={showEditCatalog}
        parentAction={updateCatalog}
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
