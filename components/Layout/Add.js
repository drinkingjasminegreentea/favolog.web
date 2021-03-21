import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/Layout.module.css'
import { UserContext } from '../../src/UserContext'
import { PageContext } from '../../src/PageContext'
import Spinner from 'react-bootstrap/Spinner'

const AddItemDialog = ({ show, parentAction }) => {
  const [catalogName, setCatalogName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const router = useRouter()
  const { acquireToken } = useContext(UserContext)
  const { catalogs, setCatalogRefresh } = useContext(PageContext)
  const [errors, setErrors] = useState({})
  const [addInProgress, setAddInProgress] = useState(false)

  const closeModal = () => {
    parentAction()
    setCatalogName('')
    setCatalogId('')
    setOriginalUrl('')
    setErrors({})
  }

  const submit = async () => {
    if (!originalUrl) {
      setErrors({
        originalUrl: 'Please enter link to your item',
      })
      return
    }

    if (!catalogId && !catalogName) {
      setErrors({
        catalog: 'Please choose a catalog or create a new one',
      })
      return
    }

    setAddInProgress(true)

    const postData = {
      catalogId,
      catalogName,
      originalUrl,
    }
    const url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`
    const accessToken = await acquireToken()

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response)
      })
      .then((data) => {
        setAddInProgress(false)
        closeModal()
        router.push(`/catalog/${data.catalogId}?refreshKey=${Date.now()}`)
        setCatalogRefresh(true)
      })
      .catch((error) => {
        setAddInProgress(false)
        closeModal()
        router.push('/item/add?redirected=yes')
        console.error(error)
      })
  }

  const handleCatalogNameChange = (e) => {
    const value = e.target.value
    setCatalogName(value)
    if (value) {
      setErrors({})
    }
  }

  const handleCatalogIdChange = (e) => {
    const value = e.target.value
    setCatalogId(value)
    if (value) {
      setErrors({})
    }
  }

  const handleUrlChange = (e) => {
    const value = e.target.value
    setOriginalUrl(value)
    if (value) {
      setErrors({})
    }
  }

  const manualEnterHandler = () => {
    closeModal()
    router.push('/item/add')
  }

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add your favorite</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={3}
            type='text'
            placeholder='https:// Just enter your favorite item web page link here and we will handle the rest. Alternatively, click on the link below to enter it manually.'
            value={originalUrl}
            onChange={handleUrlChange}
          />
          {errors && errors.originalUrl && (
            <p className='error'>{errors.originalUrl}</p>
          )}
          <span className='link' onClick={manualEnterHandler}>
            Enter manually
          </span>
        </Form.Group>
        {errors && errors.catalog && <p className='error'>{errors.catalog}</p>}
        <Form.Group>
          <Form.Control
            as='select'
            custom
            defaultValue='unselected'
            onChange={handleCatalogIdChange}
          >
            <option value='unselected' disabled='disabled'>
              Choose a catalog
            </option>
            {catalogs &&
              catalogs.map((catalog) => (
                <option key={catalog.id} value={catalog.id}>
                  {catalog.name}
                </option>
              ))}
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Or create a new catalog</Form.Label>
          <Form.Control
            type='text'
            placeholder='Catalog name'
            value={catalogName}
            onChange={handleCatalogNameChange}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' disabled={addInProgress} onClick={submit}>
          Add
        </Button>
        {addInProgress && <Spinner animation='grow' />}
      </Modal.Footer>
    </Modal>
  )
}

export default function Add() {
  const [showModal, setShowModal] = useState(false)

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.addCatalog}>
      <div
        role='button'
        className={styles.addButton + ' button'}
        onClick={toggleModalWindow}
      >
        <img src='/icons/add.png' />
      </div>
      <AddItemDialog show={showModal} parentAction={toggleModalWindow} />
    </div>
  )
}
