import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Layout.module.css'
import { AuthContext } from '../../src/AuthContext'
import { PageContext } from '../../src/PageContext'
import Spinner from 'react-bootstrap/Spinner'

const AddItemDialog = ({ show, parentAction }) => {
  const [catalogName, setCatalogName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const router = useRouter()
  const { getToken } = useContext(AuthContext)
  const { catalogs, setCatalogRefresh } = useContext(PageContext)
  const [errors, setErrors] = useState({})
  const [addInProgress, setAddInProgress] = useState(false)
  const [addDataType, setAddDataType] = useState('item')

  const closeModal = () => {
    parentAction()
    setCatalogName('')
    setCatalogId('')
    setOriginalUrl('')
    setAddDataType('item')
    setErrors({})
  }

  const submit = async () => {
    let postData, url

    if (addDataType === 'item') {
      if (!originalUrl) {
        setErrors({
          originalUrl: 'Please enter link to your item',
        })
        return
      }

      if (!catalogId) {
        setErrors({
          catalog: 'Please choose a catalog',
        })
        return
      }

      postData = {
        catalogId,
        originalUrl,
      }
      url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`
    } else {
      if (!catalogName) {
        setErrors({
          catalog: 'Please enter catalog name',
        })
        return
      }

      postData = {
        name: catalogName,
      }
      url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`
    }

    setAddInProgress(true)
    const accessToken = await getToken()

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
        let redirectCatalogId
        if (addDataType === 'item') redirectCatalogId = data.catalogId
        else redirectCatalogId = data.id
        router.push(`/catalog/${redirectCatalogId}?refreshKey=${Date.now()}`)
        setCatalogRefresh(true)
      })
      .catch((error) => {
        setAddInProgress(false)
        closeModal()
        router.push('/item/add?redirected=yes')
        console.error(error)
      })
  }

  const updateCatalogName = (e) => {
    const value = e.target.value
    setCatalogName(value)
    if (value) {
      setErrors({})
    }
  }

  const updateCatalogId = (e) => {
    const value = e.target.value
    setCatalogId(value)
    if (value) {
      setErrors({})
    }
  }

  const updateUrl = (e) => {
    const value = e.target.value
    setOriginalUrl(value)
    if (value) {
      setErrors({})
    }
  }

  const changeAddDataType = (e) => {
    setAddDataType(e.target.value)
    setErrors({})
  }

  return (
    <Modal show={show} onHide={closeModal} centered size='lg'>
      <Modal.Body>
        <Form.Group>
          <Form.Check
            defaultChecked
            type='radio'
            label='New Item'
            name='dataType'
            id='item'
            value='item'
            className={styles.checkbox}
            onChange={changeAddDataType}
          />
        </Form.Group>
        {errors && errors.originalUrl && (
          <p className='error'>{errors.originalUrl}</p>
        )}
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={3}
            autoComplete='off'
            type='text'
            placeholder='https:// Enter item link here'
            value={originalUrl}
            onChange={updateUrl}
            disabled={addDataType !== 'item'}
          />
        </Form.Group>
        {errors && errors.catalog && <p className='error'>{errors.catalog}</p>}
        <Form.Group>
          <Form.Control
            autoComplete='off'
            as='select'
            custom
            defaultValue='unselected'
            onChange={updateCatalogId}
            disabled={addDataType !== 'item'}
          >
            <option value='unselected' disabled='disabled'>
              Choose from existing catalogs
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
          <Form.Check
            type='radio'
            label='New Catalog'
            name='dataType'
            id='catalog'
            value='catalog'
            className={styles.checkbox}
            onChange={changeAddDataType}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            autoComplete='off'
            type='text'
            placeholder='Catalog name'
            value={catalogName}
            onChange={updateCatalogName}
            disabled={addDataType !== 'catalog'}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          disabled={addInProgress}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button variant='primary' disabled={addInProgress} onClick={submit}>
          Ready
        </Button>
        {addInProgress && <Spinner animation='grow' />}
      </Modal.Footer>
    </Modal>
  )
}

export default function Add() {
  const [showModal, setShowModal] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  return (
    <>
      {showOverlay && (
        <div className={styles.addOverlay}>
          <div className={styles.addText}>
            <span className='extraBold'>Add new item </span> <br />
            <span className='extraBold'>Add new catalog </span>
          </div>
        </div>
      )}
      <div
        role='button'
        className={styles.addButton + ' button'}
        onClick={toggleModalWindow}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        <img src='/icons/add.png' />
      </div>
      <AddItemDialog show={showModal} parentAction={toggleModalWindow} />
    </>
  )
}
