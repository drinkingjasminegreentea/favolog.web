import { useState, useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../src/UserContext'
import uploadImage from '../../src/UploadImage'

export default function EditItem({ show, parentAction, item }) {
  const [title, setTitle] = useState(item.title)
  const [url, setUrl] = useState(item.url)
  const [comment, setComment] = useState(item.comment || '')
  const [file, setFile] = useState()
  const { acquireToken } = useContext(UserContext)

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

    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'PUT',
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
          parentAction(data)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
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
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
