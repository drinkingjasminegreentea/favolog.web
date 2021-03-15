import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../src/UserContext'
import styles from '../../styles/CatalogStyles.module.css'

const AddItem = ({ show, parentAction, catalogId, addItemToCatalog }) => {
  const [url, setUrl] = useState('')
  const router = useRouter()
  const { acquireToken } = useContext(UserContext)

  const submit = async () => {
    const originalUrl = url.substring(url.indexOf('https://'), url.length)

    const item = {
      originalUrl,
      catalogId,
    }

    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) return response.json()
          else return Promise.reject(response)
        })
        .then((data) => {
          addItemToCatalog(data)
          parentAction()
          setUrl('')
          router.push(`/catalog/${catalogId}`)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
          router.push(`/item/add?catalogId=${catalogId}&url=${url}`)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new item to catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Please enter the item Url</Form.Label>
        <Form.Control
          type='text'
          placeholder='Item page Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function AddItemCard({ catalogId, addItemToCatalog }) {
  const [showAddItem, setShowAddItem] = useState(false)

  function toggleAddItem() {
    setShowAddItem(!showAddItem)
  }

  return (
    <div className={styles.itemAddCard}>
      <img
        className='button'
        src='/icons/plus-circle.svg'
        width='50'
        height='50'
        onClick={toggleAddItem}
      />
      <AddItem
        show={showAddItem}
        parentAction={toggleAddItem}
        catalogId={catalogId}
        addItemToCatalog={addItemToCatalog}
      />
    </div>
  )
}
