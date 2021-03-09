import { useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function AddItem({ show, parentAction, catalogId }) {
  const [url, setUrl] = useState('')
  const router = useRouter()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const submit = async () => {
    const item = {
      originalUrl: url,
      catalogId,
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
          if (response.ok) {
            parentAction()
            setUrl('')
            router.push(`/catalog/${catalogId}`)
          } else Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
          router.push(`/item/add?catalogId=${catalogId}&url=${url}`)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add new item to catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Please enter the item Url</Form.Label>
        <Form.Control
          type='text'
          placeholder='Item page Url'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
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
