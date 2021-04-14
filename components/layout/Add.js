import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form'
import styles from '../../styles/Layout.module.css'
import { AuthContext, SignInModal } from '../../src/AuthContext'
import { PageContext } from '../../src/PageContext'
import Spinner from 'react-bootstrap/Spinner'

const AddItemDialog = ({ show, parentAction }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [sourceImageUrl, setSourceImageUrl] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const [catalogName, setCatalogName] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [originalUrl, setOriginalUrl] = useState('')
  const router = useRouter()
  const { getToken } = useContext(AuthContext)
  const { catalogs, setCatalogRefresh, currentCatalogId } = useContext(
    PageContext
  )
  const [errors, setErrors] = useState({})
  const [addInProgress, setAddInProgress] = useState(false)
  const [defaultCatalog, setDefaultCatalog] = useState('unselected')
  const [createNewCatalog, setCreateNewCatalog] = useState(false)

  useEffect(() => {
    if (currentCatalogId) {
      setDefaultCatalog(currentCatalogId)
      setCatalogId(currentCatalogId)
    } else {
      setDefaultCatalog('unselected')
      setCatalogId(null)
    }
  }, [currentCatalogId])

  const closeModal = () => {
    parentAction()
    setCatalogName('')
    setCatalogId('')
    setOriginalUrl('')
    setCreateNewCatalog(false)
    setShowPreview(false)
    setErrors({})
  }

  const submit = async () => {
    if (!title) {
      setErrors({
        originalUrl: 'Please enter title of your item',
      })
      return
    }

    if (createNewCatalog && !catalogName) {
      setErrors({
        catalog: 'Please enter new catalog name',
      })
      return
    }

    if (!createNewCatalog && !catalogId) {
      setErrors({
        catalog: 'Please choose a catalog',
      })
      return
    }

    const postData = {
      catalogId,
      originalUrl,
      url,
      catalogName,
      sourceImageUrl,
      title,
    }
    const postUrl = `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`

    setAddInProgress(true)
    const accessToken = await getToken()

    fetch(postUrl, {
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
        setCatalogRefresh(createNewCatalog)
        router.push(`/catalog/${data.catalogId}?refreshKey=${Date.now()}`)
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

  const urlChangeHandler = (e) => {
    console.log('urlChangeHandler')
    const value = e.target.value
    setOriginalUrl(value)
    if (value) {
      setErrors({})
    }

    fetch(`/api/openGraph/${encodeURIComponent(value)}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(response)
      })
      .then((data) => {
        const openGraph = data.hybridGraph
        setTitle(openGraph.title)
        setSourceImageUrl(openGraph.image)
        setShowPreview(true)
        setUrl(openGraph.url)
      })
  }

  return (
    <Modal show={show} onHide={closeModal} centered size='lg'>
      <Modal.Body>
        {errors && errors.originalUrl && (
          <p className='error'>{errors.originalUrl}</p>
        )}
        <Form.Group>
          <span>
            <img src='/icons/link.svg' className='icon' />
            <b> Item page link</b> <br />
          </span>
          <br />
          <Form.Control
            as='textarea'
            rows={3}
            autoComplete='off'
            type='text'
            placeholder='https:// Just grab the web page link of your favorite item and paste here'
            value={originalUrl}
            onChange={urlChangeHandler}
          />
        </Form.Group>
        {showPreview && (
          <div className={styles.preview}>
            <Form.Control
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <img className={styles.addImage} src={sourceImageUrl} />
          </div>
        )}
        {errors && errors.catalog && <p className='error'>{errors.catalog}</p>}
        <Form.Group>
          <Form.Check
            defaultChecked
            type='radio'
            label='Choose an existing catalog'
            name='createCatalog'
            id='false'
            value='false'
            className={styles.checkbox}
            onChange={() => setCreateNewCatalog(false)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            autoComplete='off'
            as='select'
            custom
            defaultValue={defaultCatalog}
            onChange={updateCatalogId}
            disabled={createNewCatalog}
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
          <Form.Check
            type='radio'
            label='Create a new catalog'
            name='createCatalog'
            id='true'
            value='true'
            className={styles.checkbox}
            onChange={() => setCreateNewCatalog(true)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            autoComplete='off'
            type='text'
            placeholder='Catalog name'
            value={catalogName}
            onChange={updateCatalogName}
            disabled={!createNewCatalog}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <button
          className='secondary'
          disabled={addInProgress}
          onClick={closeModal}
        >
          Cancel
        </button>
        <button className='primary' disabled={addInProgress} onClick={submit}>
          Ready
        </button>
        {addInProgress && <Spinner animation='grow' />}
      </Modal.Footer>
    </Modal>
  )
}

export default function Add() {
  const [showAdd, setShowAdd] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const toggleModalWindow = () => {
    if (!currentUser) {
      setShowLogin(true)
      return
    }
    setShowAdd(true)
  }

  return (
    <>
      <div
        role='button'
        className={styles.addButton}
        onClick={toggleModalWindow}
      >
        +
      </div>
      <AddItemDialog show={showAdd} parentAction={() => setShowAdd(false)} />
      <SignInModal show={showLogin} parentAction={() => setShowLogin(false)} />
    </>
  )
}
