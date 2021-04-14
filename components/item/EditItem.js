import { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from '../../src/AuthContext'
import uploadImage from '../../src/UploadImage'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function EditItem({ show, parentAction, item }) {
  const [title, setTitle] = useState(item.title)
  const [url, setUrl] = useState(item.url)
  const [comment, setComment] = useState('')
  const [imageFile, setImageFile] = useState()
  const { getToken } = useContext(AuthContext)
  const [sourceImageUrl, setSourceImageUrl] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (item.imageName) {
      setSourceImageUrl(
        `${process.env.NEXT_PUBLIC_BLOBSTORAGEURL}/${process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER}/${item.imageName}`
      )
    }

    if (item.comment) setComment(item.comment)
  }, [])

  const submit = async () => {
    item.title = title
    item.url = url
    item.comment = comment

    if (imageFile) {
      item.ImageName = await uploadImage(
        imageFile,
        process.env.NEXT_PUBLIC_ITEMIMAGESCONTAINER
      )
    }

    getToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(item),
      })
        .then((response) => {
          if (response.ok) {
            parentAction()
            router.push(`/catalog/${item.catalogId}?refreshKey=${Date.now()}`)
          } else return Promise.reject(response)
        })
        .catch((error) => {
          console.error(error)
        })
    })
  }

  const updateImageFile = (e) => {
    const file = e.target.files[0]
    setImageFile(file)

    var reader = new FileReader()
    reader.onload = function (e) {
      // get loaded data and render thumbnail.
      setSourceImageUrl(e.target.result)
    }
    // read the image file as a data URL.
    reader.readAsDataURL(file)
  }

  return (
    <Modal show={show} onHide={() => parentAction()} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>
          <b>Title</b>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Label>
          <b>Url</b>
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {sourceImageUrl && (
          <Image
            src={sourceImageUrl}
            layout='fixed'
            objectFit='contain'
            width='200'
            height='200'
            quality={100}
          />
        )}
        <Form.File
          accept='image/*'
          label='Item image'
          onChange={updateImageFile}
        />
        <br />
        <Form.Label>
          <b>Tell us why you love it</b>
        </Form.Label>
        <Form.Control
          as='textarea'
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button className='secondary' onClick={() => parentAction()}>
          Cancel
        </button>
        <button className='primary' onClick={submit}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  )
}
