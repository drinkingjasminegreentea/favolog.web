import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function DeleteCatalogItem({
  show,
  parentAction,
  catalogId,
  itemId,
}) {
  const router = useRouter()

  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const submit = async () => {
    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}/item/${itemId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) return response.json()
          else return Promise.reject(response)
        })
        .then((data) => {
          parentAction(data)
          router.push(`/catalog/${catalogId}`)
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
