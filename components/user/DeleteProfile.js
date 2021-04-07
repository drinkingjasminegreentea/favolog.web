import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useContext } from 'react'
import { AuthContext } from '../../src/AuthContext'

export default function DeleteProfile({ username, show, parentAction }) {
  const { logOut, getToken } = useContext(AuthContext)

  async function deleteProfile() {
    getToken().then((accessToken) => {
      fetch(`${process.env.NEXT_PUBLIC_FAVOLOGAPIBASEURL}/user/${username}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            logOut()
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
        <Button variant='primary' onClick={() => deleteProfile()}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
