import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BlobServiceClient } from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function Page({ originalUrl, catalogId }) {
  const [file, setFile] = useState()
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState(originalUrl)
  const router = useRouter()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

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
    const item = {
      catalogId,
      title,
      url,
    }

    if (file) {
      item.imageName = await uploadImage()
    }

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) router.push(`/catalog/${catalogId}`)
          else Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <div>
      <h4>Add Item</h4>
      <span>
        We apologize - the source URL is not letting us retrive information
        about the item. Please add it manually.
      </span>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='text'
            placeholder='Item title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Form.Label>Source URL</Form.Label>
          <Form.Control
            type='text'
            placeholder='Source URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <Form.File
            accept='image/*'
            label='Item image'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Form.Group>
        <Button variant='secondary' onClick={addItem}>
          Add
        </Button>
      </Form>
    </div>
  )
}

export async function getServerSideProps({ query }) {
  return {
    props: {
      originalUrl: query.url,
      catalogId: query.catalogId,
    },
  }
}
