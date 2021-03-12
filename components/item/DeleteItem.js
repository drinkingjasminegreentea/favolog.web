import { useContext } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContext } from '../../src/UserContext'

export default function DeleteItem({ show, parentAction, catalogId, itemId }) {
  const { acquireToken } = useContext(UserContext)

  const submit = async () => {
    acquireToken().then((accessToken) => {
      fetch(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}/item/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
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
    <Modal show={show} onHide={() => parentAction()} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete item</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => parentAction()}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
