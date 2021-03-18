import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BlobServiceClient } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { UserContext } from '../../src/UserContext'
import useSWR from 'swr'
import Spinner from 'react-bootstrap/Spinner'

export default function Page({ redirected }) {
  const [file, setFile] = useState()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [catalogId, setCatalogId] = useState('')
  const [catalogName, setCatalogName] = useState('')
  const router = useRouter()
  const { user, acquireToken } = useContext(UserContext)
  const [errors, setErrors] = useState({})
  const [addInProgress, setAddInProgress] = useState(false)

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

  const fetchUrl = user
    ? `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/catalog`
    : null

  const { data, error } = useSWR(fetchUrl, fetcher)

  function getFileExtension(fileName) {
    const lastDot = fileName.lastIndexOf('.')
    return fileName.substring(lastDot)
  }

  async function uploadImage() {
    const blobName = uuidv4() + getFileExtension(file.name)
    const blobServiceClient = new BlobServiceClient(
      `https://${process.env.NEXT_PUBLIC_BLOBSTORAGEACCOUNT}.blob.core.windows.net${process.env.NEXT_PUBLIC_BLOBSTORAGESASKEY}`
    )
    const containerClient = blobServiceClient.getContainerClient(
      `${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}`
    )
    var options = { blobContentType: file.type }
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    await blockBlobClient.uploadData(file, { blobHTTPHeaders: options })
    return blobName
  }

  const addItem = async () => {
    if (!title) {
      setErrors({
        title: 'Please enter a title for your favorite item',
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

    const itemPost = {
      catalogId,
      catalogName,
      title,
      url,
    }

    if (file) {
      itemPost.imageName = await uploadImage()
    }

    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(itemPost),
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          return Promise.reject(response)
        })
        .then((data) => {
          router.push(`/catalog/${data.catalogId}?refreshKey=${Date.now()}`)
          setAddInProgress(false)
        })
        .catch((error) => {
          setAddInProgress(false)
          console.error(error)
        })
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
    setUrl(value)
    if (value) {
      setErrors({})
    }
  }

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div>
      <h4>Add Item</h4>
      {redirected && (
        <span>
          We apologize - the source URL is not letting us retrive information
          about the item. Please add it manually.
        </span>
      )}
      <Form>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Item title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors && errors.title && <p className='error'>{errors.title}</p>}
        </Form.Group>

        {errors && errors.catalog && <p className='error'>{errors.catalog}</p>}
        <Form.Group>
          <Form.Control
            as='select'
            custom
            defaultValue={catalogId || 'unselected'}
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
        <Form.Group>
          <Form.File
            accept='image/*'
            label='Item image'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as='textarea'
            rows={3}
            type='text'
            placeholder='Item page link'
            value={url}
            onChange={handleUrlChange}
          />
          {errors && errors.url && <p className='error'>{errors.url}</p>}
        </Form.Group>
        <Button variant='secondary' disabled={addInProgress} onClick={addItem}>
          Add
        </Button>
        {addInProgress && <Spinner animation='grow' />}
      </Form>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      redirected: query.redirected || '',
    },
  }
}
