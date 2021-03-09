import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../src/UserContext'
import styles from '../../styles/Layout.module.css'
import { scopes } from '../../src/UserContext'
import { useMsal } from '@azure/msal-react'

const AddCatalogDialog = ({ show, parentAction }) => {
  const { user } = useContext(UserContext)
  const [name, setName] = useState('')
  const router = useRouter()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  async function add() {
    const catalog = {
      name: name,
      audienceType: 1,
      userId: user.id,
    }

    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${response.accessToken}`,
        },
        body: JSON.stringify(catalog),
      })
        .then((response) => {
          if (response.ok) return response.json()
          return Promise.reject(response)
        })
        .then((newCatalog) => {
          parentAction()
          setName('')
          router.push(`/catalog/${newCatalog.id}`)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create a new catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type='text'
          placeholder='Name your catalog'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={() => add()}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default function AddCatalog() {
  const [showModal, setShowModal] = useState(false)

  const toggleModalWindow = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={styles.addCatalog}>
      <div
        role='button'
        className={styles.addButton + ' button'}
        onClick={toggleModalWindow}
      >
        <img src='/icons/add.png' />
      </div>
      <AddCatalogDialog show={showModal} parentAction={toggleModalWindow} />
    </div>
  )
}