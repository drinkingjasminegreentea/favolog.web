import { useState, useContext, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Layout.module.css'
import { AuthContext } from '../../src/AuthContext'
import { PageContext } from '../../src/PageContext'
import Spinner from 'react-bootstrap/Spinner'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const AddItemDialog = ({ show, parentAction }) => {
  const [catalogName, setCatalogName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const router = useRouter()
  const { currentUser } = useContext(AuthContext)
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

  const textAreaRef = useRef()

  function paste() {
    textAreaRef.current.focus()
    navigator.clipboard.readText().then((clipText) => {
      if (clipText.includes('https://')) textAreaRef.current.value += clipText
    })
  }

  useEffect(() => {
    if (textAreaRef.current) paste()
  }, [textAreaRef.current])

  return (
    <Modal show={show} onHide={closeModal} centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Adding new item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group as={Row}>
          <Form.Label column md='3'>
            Paste item link
          </Form.Label>
          <Col md='9'>
            <Form.Control
              autoComplete='off'
              ref={textAreaRef}
              type='text'
              placeholder='https://'
              value={originalUrl}
              onChange={handleUrlChange}
            />
          </Col>
        </Form.Group>
        {errors && errors.originalUrl && (
          <p className='error'>{errors.originalUrl}</p>
        )}
        {errors && errors.catalog && <p className='error'>{errors.catalog}</p>}
        <Form.Group as={Row}>
          <Form.Label column md='3'>
            Catalog
          </Form.Label>
          <Col md='9'>
            <Form.Control
              autoComplete='off'
              as='select'
              custom
              defaultValue='unselected'
              onChange={handleCatalogIdChange}
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
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column md='3'>
            Create a new catalog
          </Form.Label>
          <Col md='9'>
            <Form.Control
              autoComplete='off'
              type='text'
              placeholder='Enter name of a new catalog for this item'
              value={catalogName}
              onChange={handleCatalogNameChange}
            />
          </Col>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' disabled={addInProgress} onClick={submit}>
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
