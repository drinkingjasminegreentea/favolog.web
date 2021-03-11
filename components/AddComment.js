import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function AddComment({ show, parentAction, item }) {
  const [comment, setComment] = useState('')
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const submit = async () => {
    item.comment = comment

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/item`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
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
        <Modal.Title>Add comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          as='textarea'
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
