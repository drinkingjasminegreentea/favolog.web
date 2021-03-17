import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../../styles/Layout.module.css'
import { UserContext } from '../../src/UserContext'
import useSWR from 'swr'

const AddItemDialog = ({ show, parentAction }) => {
  const [catalogName, setCatalogName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [itemUrl, setItemUrl] = useState('')
  const [dataType, setDataType] = useState('item')
  const router = useRouter()
  const { user, acquireToken } = useContext(UserContext)
  const [errors, setErrors] = useState({})

  const fetcher = (url) => {
    return acquireToken().then((accessToken) => {
      return fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) return response.json()
          return Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  const url = user
    ? `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/catalog`
    : null

  const { data, error } = useSWR(url, fetcher)

  const closeModal = () => {
    parentAction()
    setCatalogName('')
    setCatalogId('')
    setItemUrl('')
    setErrors({})
    setDataType('item')
  }

  const submit = async () => {
    let postData, url
    if (dataType == 'item') {
      if (!itemUrl) {
        setErrors({
          itemUrl: 'Please enter item page URL',
        })
        return
      }
      if (!catalogId) {
        setErrors({ ...errors, catalogId: 'Please choose a catalog' })
        return
      }

      postData = {
        catalogId,
        originalUrl: itemUrl,
      }
      url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`
    } else {
      if (!catalogName) {
        setErrors({
          catalogName: 'Please enter new catalog name',
        })
        return
      }

      postData = {
        name: catalogName,
      }
      url = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`
    }

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
        closeModal()
        let id = catalogId
        if (dataType === 'catalog') id = data.id
        router.push(`/catalog/${id}?refreshKey=${Date.now()}`)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const handleDataTypeChange = (e) => {
    setErrors({})
    setDataType(e.target.value)
  }

  const handleCatalogNameChange = (e) => {
    const value = e.target.value
    if (value) {
      setCatalogName(value)
      setErrors({})
    }
  }

  const handleCatalogIdChange = (e) => {
    const value = e.target.value
    if (value) {
      setCatalogId(value)
      setErrors({})
    }
  }

  const handleItemUrlChange = (e) => {
    const value = e.target.value
    if (value) {
      setItemUrl(value)
      setErrors({})
    }
  }

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <Modal show={show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add your favorite</Modal.Title>
      </Modal.Header>
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
            onChange={handleDataTypeChange}
          />
          <Form.Control
            as='textarea'
            rows={3}
            type='text'
            placeholder='Item page link'
            value={itemUrl}
            disabled={dataType !== 'item'}
            onChange={handleItemUrlChange}
          />
          {errors && errors.itemUrl && (
            <p className='error'>{errors.itemUrl}</p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='select'
            custom
            defaultValue='unselected'
            disabled={dataType !== 'item'}
            onChange={handleCatalogIdChange}
          >
            <option value='unselected' disabled='disabled'>
              Choose a catalog
            </option>
            {data.map((catalog) => (
              <option key={catalog.id} value={catalog.id}>
                {catalog.name}
              </option>
            ))}
          </Form.Control>
          {errors && errors.catalogId && (
            <p className='error'>{errors.catalogId}</p>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='radio'
            label='New Catalog'
            name='dataType'
            id='catalog'
            value='catalog'
            className={styles.checkbox}
            onChange={handleDataTypeChange}
          />
          <Form.Control
            type='text'
            placeholder='Catalog name'
            value={catalogName}
            disabled={dataType === 'item'}
            onChange={handleCatalogNameChange}
          />
          {errors && errors.catalogName && (
            <p className='error'>{errors.catalogName}</p>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Add
        </Button>
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
