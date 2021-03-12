import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../src/UserContext'

export default function EditCatalog({ show, parentAction, catalog }) {
  const [name, setName] = useState(catalog.name)
  const router = useRouter()
  const { acquireToken } = useContext(UserContext)

  const submit = async () => {
    const data = {
      name: name,
      id: catalog.id,
    }

    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) return response.json()
          else return Promise.reject(response)
        })
        .then((data) => {
          parentAction(data)
          router.push(`/catalog/${catalog.id}`)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={() => parentAction()} centered>
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
        <Button variant='secondary' onClick={() => parentAction()}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
