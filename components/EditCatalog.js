import { useState } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function EditCatalog({ show, parentAction, catalog }) {
  const [name, setName] = useState(catalog.name)
  const router = useRouter()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const submit = async () => {
    const data = {
      name: name,
      id: catalog.id,
    }

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            parentAction()
            setName('')
            router.push(`/catalog/${catalog.id}`)
          } else Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type='text'
          placeholder='Catalog name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
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
