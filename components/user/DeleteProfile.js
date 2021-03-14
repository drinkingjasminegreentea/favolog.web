import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { UserContext } from '../../src/UserContext'

export default function DeleteProfile({ userId, show, parentAction }) {
  const { signOut, acquireToken } = useContext(UserContext)

  async function deleteProfile() {
    acquireToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            signOut()
            parentAction()
          } else return Promise.reject(response)
        })
        .catch((error) => {
          console.log('Something went wrong.', error)
        })
    })
  }

  return (
    <Modal show={show} onHide={parentAction} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input placeholder='Enter delete here'></input>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={parentAction}>
          Cancel
        </Button>
        <Button variant='secondary' onClick={() => deleteProfile()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
