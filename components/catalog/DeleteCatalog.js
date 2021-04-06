import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'

export default function DeleteCatalog({ show, parentAction, catalogId }) {
  const router = useRouter()
  const { user } = useContext(UserContext)
  const { getToken } = useContext(AuthContext)

  const submit = async () => {
    getToken().then((accessToken) => {
      fetch(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            parentAction()
            router.push(`/${user.username}`)
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
        <Modal.Title>Delete catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this catalog?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={submit}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
