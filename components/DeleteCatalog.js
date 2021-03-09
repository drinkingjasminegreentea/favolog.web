import { useRouter } from 'next/router'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import { UserContext } from '../src/UserContext'
import { scopes } from '../src/UserContext'
import { useMsal } from '@azure/msal-react'

export default function DeleteCatalog({ show, parentAction, catalogId }) {
  const { user } = useContext(UserContext)
  const router = useRouter()
  const { instance, accounts } = useMsal()
  const account = accounts[0]

  const submit = async () => {
    instance.acquireTokenSilent({ account, scopes }).then((response) => {
      fetch(
        `${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/catalog/${catalogId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${response.accessToken}`,
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            parentAction()
            router.push(`/user/${user.username}`)
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
