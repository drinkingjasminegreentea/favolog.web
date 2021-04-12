import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthContext } from '../../src/AuthContext'

export default function EditCatalog({ show, parentAction, catalog }) {
  const [name, setName] = useState(catalog.name)
  const router = useRouter()
  const { getToken } = useContext(AuthContext)

  const submit = async () => {
    const data = {
      name: name,
      id: catalog.id,
    }

    getToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            parentAction()
            router.push(`/catalog/${catalog.id}?refreshKey=${Date.now()}`)
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
