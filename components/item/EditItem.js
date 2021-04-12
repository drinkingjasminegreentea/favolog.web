import { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from '../../src/AuthContext'
import uploadImage from '../../src/UploadImage'
import { useRouter } from 'next/router'

export default function EditItem({ show, parentAction, item }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')
  const [file, setFile] = useState()
  const { getToken } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    setTitle(item.title)
    setUrl(item.url)
    setComment(item.comment)
  }, [item.comment])

  const submit = async () => {
    item.title = title
    item.url = url
    item.comment = comment

    if (file) {
      item.ImageName = await uploadImage(
        file,
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

  return (
    <Modal show={show} onHide={() => parentAction()} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Label>Url</Form.Label>
        <Form.Control
          type='text'
          placeholder='Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Form.File
          accept='image/*'
          label='Item image'
          onChange={(e) => setFile(e.target.files[0])}
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
